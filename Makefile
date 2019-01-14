PROJECT_NAME := fastlane-ui
API_PATH := ./api
CLIENT_PATH := ./client

COMPOSE := $(shell command -v docker-compose 2> /dev/null)

setup:
	@echo "Setup node deps..."
	@yarn --cwd ${API_PATH} install
	@yarn --cwd ${CLIENT_PATH} install

deps:
	@mkdir -p /tmp/fastlane/{mongo,redis}
ifdef COMPOSE
	@echo "Starting docker dependencies..."
	@docker-compose --project-name ${PROJECT_NAME} up -d
	@echo "Dependencies started successfully"
endif

deps-build:
ifdef COMPOSE
	@echo "Starting/buiding docker dependencies..."
	@docker-compose --project-name ${PROJECT_NAME} up --build -d
	@echo "Dependencies started successfully"
endif

stop-deps:
ifdef COMPOSE
	@echo "Stopping docker dependencies..."
	@docker-compose --project-name ${PROJECT_NAME} stop
	@docker-compose --project-name ${PROJECT_NAME} rm -f
	@echo "Dependencies stopped successfully"
endif

run-api: deps
	@echo "Starting the api server..."

run-client: deps
	@echo "Starting the client dev server..."
	@yarn --cwd ${CLIENT_PATH} start

test-client:
	@echo "Testing client code..."
	@yarn --cwd ${CLIENT_PATH} test

test-api:
	@echo "Testing api code..."
	@yarn --cwd ${API_PATH} test

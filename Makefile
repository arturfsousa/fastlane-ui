API_PATH := ./api
CLIENT_PATH := ./client

setup:
	@echo "Setup node deps..."
	@yarn --cwd ${API_PATH} install
	@yarn --cwd ${CLIENT_PATH} install

run-api:
	@echo "Starting the api server..."

run-client:
	@echo "Starting the client dev server..."
	@yarn --cwd ${CLIENT_PATH} start

run: run-api run-client

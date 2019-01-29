import React, { ReactNode, Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { AppProvider } from '@shopify/polaris'
import { Router, RouteComponentProps } from '@reach/router'

import TasksPage from './pages/Tasks/TasksPage'
import TaskEnqueuePage from './pages/Tasks/TaskEnqueuePage'
import TaskDetailsPage from './pages/Tasks/TaskDetailsPage'

import './index.css'

const client = new ApolloClient({
  uri: process.env.FASTLANE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

type Props = {
  path: string
  pageComponent?: JSX.Element
  pageFunction?: (props: any) => JSX.Element
} & RouteComponentProps

class Page extends React.Component<Props> {
  render(): ReactNode {
    if (
      this.props.pageComponent === undefined &&
      this.props.pageFunction === undefined
    ) {
      console.error('Both pageComponent and pageFunction are null/undefined!')
    }

    if (this.props.pageComponent !== undefined) {
      return this.props.pageComponent
    }

    if (this.props.pageFunction !== undefined) {
      return this.props.pageFunction(this.props)
    }

    return <div />
  }
}

//props: {
//pageComponent?: JSX.Element
//pageFunction?: (props: any) => JSX.Element
//} & RouteComponentProps,
//) => (props.pageComponent ? props.pageComponent : props.pageFunction)

type TaskDetailsProps = {
  taskId: string
}

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <div className="FastlaneUI">
            <Router>
              <Page path="/" pageComponent={<TasksPage />} />
              <Page path="/enqueue" pageComponent={<TaskEnqueuePage />} />
              <Page path="/enqueue" pageComponent={<div>enqueue page</div>} />
              <Page
                path="/tasks/:taskId"
                pageFunction={(props: TaskDetailsProps): JSX.Element => (
                  <TaskDetailsPage {...props} />
                )}
              />
            </Router>
          </div>
        </AppProvider>
      </ApolloProvider>
    )
  }
}

export default App

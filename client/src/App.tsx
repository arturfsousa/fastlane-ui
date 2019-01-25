import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { AppProvider } from '@shopify/polaris'
import { Router, RouteComponentProps } from '@reach/router'

import TasksPage from './pages/Tasks/TasksPage'
import TaskEnqueuePage from './pages/Tasks/TaskEnqueuePage'

import './index.css'
import '@shopify/polaris/styles.css'

const client = new ApolloClient({
  uri: process.env.FASTLANE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

const Page = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <div className="FastlaneUI">
            <Router>
              <Page path="/" pageComponent={<TasksPage />} />
              <Page path="/enqueue" pageComponent={<TaskEnqueuePage />} />
            </Router>
          </div>
        </AppProvider>
      </ApolloProvider>
    )
  }
}

export default App

import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { AppProvider } from '@shopify/polaris'

import Tasks from './pages/Tasks/TasksPage'

import './index.css'
import '@shopify/polaris/styles.css'

const client = new ApolloClient({
  uri: process.env.FASTLANE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <Tasks />
        </AppProvider>
      </ApolloProvider>
    )
  }
}

export default App

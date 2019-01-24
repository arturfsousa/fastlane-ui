import React, { Component } from 'react'
import { AppProvider } from '@shopify/polaris'
import Tasks from './pages/Tasks'

import './index.css'
import '@shopify/polaris/styles.css'

class App extends Component {
  render() {
    return (
      <AppProvider theme={{}}>
        <Tasks />
      </AppProvider>
    )
  }
}

export default App

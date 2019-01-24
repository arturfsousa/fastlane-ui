import React from 'react'
import Page from '../components/Page'
import { Button } from '@shopify/polaris'
import './Tasks.css'

const Tasks = () => (
  <Page title="Tasks">
    <div className="Fastlane-NoResults">
      <div className="Fastlane-NoResults__Message">
        You didn't create any tasks yet
      </div>
      <div className="Fastlane-NoResults__Message__Actions">
        <Button primary={true}>Create a task</Button>
      </div>
    </div>
  </Page>
)

export default Tasks

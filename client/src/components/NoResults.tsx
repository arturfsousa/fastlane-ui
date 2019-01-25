import React from 'react'
import { Button } from '@shopify/polaris'

import './NoResults.css'

const NoResults = () => (
  <div className="Fastlane-NoResults">
    <div className="Fastlane-NoResults__Message">
      You didn't create any tasks yet
    </div>
    <div className="Fastlane-NoResults__Message__Actions">
      <Button primary={true}>Create a task</Button>
    </div>
  </div>
)

export default NoResults

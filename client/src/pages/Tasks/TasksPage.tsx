import React from 'react'
import Page from '../../components/Page'

import TasksList from './TasksList'
import NoResults from '../../components/NoResults'

import './TasksPage.css'

const Tasks = () => (
  <Page title="Tasks">
    <TasksList />
  </Page>
)

export default Tasks

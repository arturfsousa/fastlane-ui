import React from 'react'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import NoResults from '../../components/NoResults'

const tasksQuery = gql`
  {
    tasks {
      taskId
      createdAt
      lastModifiedAt
    }
  }
`
type Task = {
  taskId: string
  createdAt: string
  lastModifiedAt: string
}

type Response = {
  tasks: Task[]
}

type ChildProps = ChildDataProps<{}, Response, {}>

const withTasks = graphql<{}, Response, {}, ChildProps>(tasksQuery)

export default withTasks(({ data: { loading, tasks, error } }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <h1>ERROR</h1>
  return (
    <div className="FastlaneUI-TasksList">
      {tasks && tasks.length > 0 ? (
        <div className="FastlaneUI-TasksList__Task">
          {tasks.map((task: Task) => (
            <div className="">{task.taskId}</div>
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  )
})

import React from 'react'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'

const taskByIdQuery = gql`
  query task($taskId: String!) {
    task(taskId: $taskId) {
      jobsCount
    }
  }
`

type TaskData = {
  jobsCount: number
}

type Response = {
  task: TaskData
}

type InputProps = {
  taskId: string
}

type Variables = {
  taskId: string
}

type ChildProps = ChildDataProps<InputProps, Response, Variables>

const withTaskDetails = graphql<InputProps, Response, Variables, ChildProps>(
  taskByIdQuery,
  {
    options: ({ taskId }) => ({
      variables: { taskId },
    }),
  },
)

const TaskDetails = ({ task: { jobsCount } }: Response): JSX.Element => {
  //const rows: React.ReactNode[][] = []
  //tasks.forEach(({ taskId, createdAt, lastModifiedAt }: Task) => {
  //rows.push([
  //<Link key={`task-item-${taskId}`} url={`/tasks/${taskId}`}>
  //{taskId}
  //</Link>,
  //createdAt,
  //lastModifiedAt,
  //])
  //})

  return <div>{jobsCount}</div>
}

export default withTaskDetails(({ data: { loading, task, error } }) => {
  if (loading) return <div>Loading...</div>
  if (error || task === undefined) return <h1>ERROR</h1>
  const jobsCount: number = task.jobsCount
  return (
    <div className="FastlaneUI-TasksList">
      <TaskDetails task={task} />
    </div>
  )
})

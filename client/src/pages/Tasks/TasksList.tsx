import React from 'react'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import { Card, DataTable, Link, Page } from '@shopify/polaris'
import NoResults from '../../components/NoResults'

const tasksQuery = gql`
  {
    tasks {
      items {
        taskId
        createdAt
        lastModifiedAt
      }
    }
  }
`

type Task = {
  taskId: string
  createdAt: string
  lastModifiedAt: string
}

type TaskResponse = {
  hasNextPage: boolean
  nextPage: number
  hasPrevPage: boolean
  prevPage: number
  totalPages: number
  perPage: number
  items: Task[]
}

type Response = {
  tasks: TaskResponse
}

type ChildProps = ChildDataProps<{}, Response, {}>

const withTasks = graphql<{}, Response, {}, ChildProps>(tasksQuery)

type TaskListProps = {
  tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
  const rows: React.ReactNode[][] = []
  tasks.forEach(({ taskId, createdAt, lastModifiedAt }: Task) => {
    rows.push([
      <Link key={`task-item-${taskId}`} url={`/tasks/${taskId}`}>
        {taskId}
      </Link>,
      createdAt,
      lastModifiedAt,
    ])
  })

  return (
    <div>
      <Card>
        <DataTable
          columnContentTypes={['text', 'text', 'text']}
          headings={['Name', 'Created', 'Updated']}
          rows={rows}
        />
      </Card>
    </div>
  )
}

export default withTasks(({ data: { loading, tasks, error } }) => {
  if (loading) return <div>Loading...</div>
  if (error || !tasks) return <h1>ERROR</h1>
  const { items } = tasks
  return (
    <div className="FastlaneUI-TasksList">
      {items && items.length > 0 ? <TaskList tasks={items} /> : <NoResults />}
    </div>
  )
})

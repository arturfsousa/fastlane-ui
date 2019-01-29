import React from 'react'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import { Button, Empty, Skeleton, Table } from 'antd'
import { Link } from '@reach/router'

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
  const columns = [
    {
      title: 'Task Id',
      dataIndex: 'taskId',
      key: 'taskId',
      render: (text: string) => <Link to={`/tasks/${text}`}>{text}</Link>,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 300,
    },
    {
      title: 'Modified at',
      dataIndex: 'lastModifiedAt',
      key: 'lastModifiedAt',
      width: 300,
    },
  ]

  const data: any = []
  tasks.forEach((task, i) => {
    data.push({
      key: i,
      taskId: task.taskId,
      createdAt: task.createdAt,
      lastModifiedAt: task.lastModifiedAt,
    })
  })

  return <Table columns={columns} dataSource={data} pagination={false} />
}

export default withTasks(({ data: { loading, tasks, error } }) => {
  if (loading)
    return <Skeleton loading={true} active={true} paragraph={{ rows: 3 }} />
  if (error || !tasks) return <h1>ERROR</h1>
  const { items } = tasks
  return (
    <div className="FastlaneUI-TasksList">
      {items && items.length > 0 ? (
        <TaskList tasks={items} />
      ) : (
        <Empty
          description={
            <span>
              You didn't create any tasks yet. You can create one by enqueuing a
              new job. Click the button bellow to do it.
            </span>
          }
        >
          <Button type="primary" size="large">
            Enqueue new job
          </Button>
        </Empty>
      )}
    </div>
  )
})

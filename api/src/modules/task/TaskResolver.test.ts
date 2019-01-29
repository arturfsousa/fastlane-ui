import { graphCall } from '../../test-utils/graphql'

const tasksQuery = `
{
  tasks {
    perPage
    totalPages
    hasNextPage
    hasPrevPage
    nextPage
    prevPage
    items {
    	taskId
      createdAt
      lastModifiedAt
  	}
  }
}
`

describe('TaskResolver', () => {
  it('get tasks TasksResponse', async () => {
    const tasksResp = {
      hasNext: false,
      hasPrev: false,
      items: [
        {
          createdAt: '2019-01-29T01:28:46.882000',
          jobsCount: 1,
          lastModifiedAt: '2019-01-29T01:28:46.882000',
          taskId: 'hello-world',
          url: 'http://localhost:10000/tasks/hello-world/',
        },
      ],
      nextUrl: null,
      page: 1,
      pages: 1,
      perPage: 10,
      prevUrl: null,
      total: 1,
    }

    const {
      data: { tasks },
    } = await graphCall({
      source: tasksQuery,
      fastlaneClient: {
        get: jest.fn().mockResolvedValue({
          status: 200,
          json: jest.fn().mockResolvedValue(tasksResp),
        }),
      },
    })

    expect(tasks.items).toHaveLength(1)
    expect(tasks.perPage).toBe(tasksResp.perPage)
    expect(tasks.totalPages).toBe(tasksResp.pages)
    expect(tasks.hasNextPage).toBe(tasksResp.hasNext)
    expect(tasks.hasPrevPage).toBe(tasksResp.hasPrev)
    expect(tasks.nextPage).toBe(1)
    expect(tasks.prevPage).toBe(1)
  })

  it('get tasks items', async () => {
    const tasksResp = {
      hasNext: false,
      hasPrev: false,
      items: [
        {
          createdAt: '2019-01-29T01:28:46.882000',
          jobsCount: 1,
          lastModifiedAt: '2019-01-29T01:28:46.882000',
          taskId: 'hello-world',
          url: 'http://localhost:10000/tasks/hello-world/',
        },
      ],
      nextUrl: null,
      page: 1,
      pages: 1,
      perPage: 10,
      prevUrl: null,
      total: 1,
    }

    const {
      data: { tasks },
    } = await graphCall({
      source: tasksQuery,
      fastlaneClient: {
        get: jest.fn().mockResolvedValue({
          status: 200,
          json: jest.fn().mockResolvedValue(tasksResp),
        }),
      },
    })

    const task = tasks.items[0]
    const taskRespItem = tasksResp.items[0]

    expect(task.taskId).toBe(taskRespItem.taskId)
    expect(task.createdAt).toBe(new Date(taskRespItem.createdAt).toISOString())
    expect(task.lastModifiedAt).toBe(
      new Date(taskRespItem.lastModifiedAt).toISOString(),
    )
  })
})

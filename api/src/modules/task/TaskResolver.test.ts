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
  let tasksResp: any
  let tasks: any

  beforeAll(async () => {
    tasksResp = {
      hasNext: false,
      hasPrev: false,
      items: [
        {
          taskId: 'hello-world',
          jobsCount: 1,
          createdAt: new Date('2019-01-29T01:28:46.882000'),
          lastModifiedAt: new Date('2019-01-29T01:28:46.882000'),
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

    const resp = await graphCall({
      source: tasksQuery,
      fastlaneClient: {
        get: jest.fn().mockResolvedValue({
          status: 200,
          json: jest.fn().mockResolvedValue(tasksResp),
        }),
      },
    })

    tasks = resp.data.tasks
  })

  it('get tasks', async () => {
    expect(tasks.items).toHaveLength(1)
    expect(tasks.perPage).toBe(tasksResp.perPage)
    expect(tasks.totalPages).toBe(tasksResp.pages)
    expect(tasks.hasNextPage).toBe(tasksResp.hasNext)
    expect(tasks.hasPrevPage).toBe(tasksResp.hasPrev)
    expect(tasks.nextPage).toBe(1)
    expect(tasks.prevPage).toBe(1)
  })

  it('get tasks items', async () => {
    const task = tasks.items[0]
    const taskRespItem = tasksResp.items[0]

    expect(task.taskId).toBe(taskRespItem.taskId)
    expect(task.createdAt).toBe(new Date(taskRespItem.createdAt).toISOString())
    expect(task.lastModifiedAt).toBe(
      new Date(taskRespItem.lastModifiedAt).toISOString(),
    )
  })
})

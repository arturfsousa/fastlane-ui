import { graphCall } from '../../test-utils/graphql'

const tasksQuery = `
  {
    tasks {
      taskId
      createdAt
      lastModifiedAt
    }
  }
`

describe('TaskResolver', () => {
  test('get tasks', async () => {
    const task = {
      taskId: 'some-task',
      createdAt: 1548344092.098,
      lastModifiedAt: 1548344092.098,
    }

    const { data } = await graphCall({
      source: tasksQuery,
      fastlaneClient: {
        get: jest.fn().mockResolvedValue({
          items: [task],
        }),
      },
    })

    expect(data.tasks).toHaveLength(1)
    expect(data.tasks[0]).toMatchObject({
      taskId: task.taskId,
      createdAt: new Date(task.createdAt * 1000).toISOString(),
      lastModifiedAt: new Date(task.lastModifiedAt * 1000).toISOString(),
    })
  })
})

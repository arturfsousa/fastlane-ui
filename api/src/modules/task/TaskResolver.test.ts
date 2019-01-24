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

    const resp = await graphCall({
      source: tasksQuery,
      fastlaneClient: {
        get: jest.fn().mockResolvedValue({
          items: [task],
        }),
      },
    })

    expect(data.tasks).toHaveLength(1)
    expect(data.tasks[0]).toMatchObject(task)
  })
})

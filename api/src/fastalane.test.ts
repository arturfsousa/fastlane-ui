import { FastlaneClient } from './fastlane'
declare const fetch: any

jest.mock('isomorphic-fetch')

describe('FastlaneClient', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('should initialize with a default apiUrl', () => {
    const client = new FastlaneClient()
    expect(client.apiUrl).toBe('http://localhost:10000')
  })

  test('should getTasks', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [{ taskId: 'some-task' }],
      }),
    )

    const client = new FastlaneClient()
    const tasks = await client.getTasks()
    expect(fetch).toBeCalledWith('http://localhost:10000/tasks/')
    expect(tasks).toHaveLength(1)
  })
})

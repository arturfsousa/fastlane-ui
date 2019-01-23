import { FastlaneClient } from './fastlane'
declare const fetch: any

const envVars = process.env

jest.mock('isomorphic-fetch')

describe('FastlaneClient', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  afterEach(() => {
    process.env = envVars
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

  test('should override default apiUrl', async () => {
    process.env.FASTLANE_API_URL = 'http://someother:9090'
    fetch.mockResponseOnce(JSON.stringify({}))

    const client = new FastlaneClient()
    await client.getTasks()
    expect(fetch).toBeCalledWith('http://someother:9090/tasks/')
  })
})

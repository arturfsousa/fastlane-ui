import { FastlaneClient } from './fastlane'
declare const fetch: any

const envVars = { ...process.env }

jest.mock('isomorphic-fetch')

beforeEach(() => {
  fetch.resetMocks()
  process.env = { ...envVars }
})

afterEach(() => {
  process.env = envVars
})

describe('FastlaneClient', () => {
  describe('fetch', () => {
    const mockResponse = {
      items: [{ taskId: 'some-task' }],
    }

    beforeEach(() => {
      fetch.mockResponseOnce(JSON.stringify(mockResponse))
    })

    test('should mount the url from the path', async () => {
      const client = new FastlaneClient()
      const result = await client.fetch('tasks')
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {})
      expect(result).toEqual(mockResponse)
    })

    test('should override apiUrl from env', async () => {
      process.env.FASTLANE_API_URL = 'http://someother:9090'

      const client = new FastlaneClient()
      await client.fetch('tasks')
      expect(fetch).toBeCalledWith('http://someother:9090/tasks/', {})
    })

    test('should mount the url with querystring', async () => {
      const client = new FastlaneClient()
      await client.fetch('tasks', {}, { page: 1, filter: 'name' })
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?page=1&filter=name',
        {},
      )
    })

    test('should pass init props to fetch', async () => {
      const client = new FastlaneClient()
      await client.fetch('tasks/some-id', { method: 'DELETE' })
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/some-id/', {
        method: 'DELETE',
      })
    })
  })

  describe('get', () => {
    const mockResponse = {
      items: [{ taskId: 'some-task' }],
    }

    beforeEach(() => {
      fetch.mockResponseOnce(JSON.stringify(mockResponse))
    })

    test('should do a GET request', async () => {
      const client = new FastlaneClient()
      const result = await client.get('tasks')
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'GET',
      })
      expect(result).toEqual(mockResponse)
    })

    test('should do a GET request with querystring', async () => {
      const client = new FastlaneClient()
      await client.get('tasks', { name: 'some-task' })
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?name=some-task',
        {
          method: 'GET',
        },
      )
    })
  })

  describe('post', () => {
    const mockResponse = {
      items: [{ taskId: 'some-task' }],
    }

    beforeEach(() => {
      fetch.mockResponseOnce(JSON.stringify(mockResponse))
    })

    test('should do a POST request', async () => {
      const client = new FastlaneClient()
      const result = await client.post('tasks')
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body: {},
      })
      expect(result).toEqual(mockResponse)
    })

    test('should do a POST request with body', async () => {
      const client = new FastlaneClient()
      const body = { name: 'some-task' }
      await client.post('tasks', body)
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body,
      })
    })
  })

  describe('put', () => {
    const mockResponse = {
      items: [{ taskId: 'some-task' }],
    }

    beforeEach(() => {
      fetch.mockResponseOnce(JSON.stringify(mockResponse))
    })

    test('should do a PUT request', async () => {
      const client = new FastlaneClient()
      const result = await client.put('tasks')
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body: {},
      })
      expect(result).toEqual(mockResponse)
    })

    test('should do a PUT request with body', async () => {
      const client = new FastlaneClient()
      const body = { name: 'some-task' }
      await client.put('tasks', body)
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body,
      })
    })
  })
})

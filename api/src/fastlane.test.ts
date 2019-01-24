import originalFetch from 'node-fetch'

import { FastlaneClient } from './fastlane'

const envVars = { ...process.env }

jest.mock('node-fetch')

const fetch = originalFetch as jest.Mock<typeof originalFetch>

beforeEach(() => {
  fetch.mockReset()
  process.env = { ...envVars }
})

afterEach(() => {
  process.env = envVars
})

describe('FastlaneClient', () => {
  describe('fetch', () => {
    test('should mount the url from the path', async () => {
      const client = new FastlaneClient()
      const response = await client.fetch('tasks')
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {})
    })

    test('should override apiUrl from env', async () => {
      process.env.FASTLANE_API_URL = 'http://someother:9090'

      const client = new FastlaneClient()
      const response = await client.fetch('tasks')
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://someother:9090/tasks/', {})
    })

    test('should mount the url with querystring', async () => {
      const client = new FastlaneClient()
      const response = await client.fetch(
        'tasks',
        {},
        { page: 1, filter: 'name' },
      )
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?page=1&filter=name',
        {},
      )
    })

    test('should pass init props to fetch', async () => {
      const client = new FastlaneClient()
      const response = await client.fetch('tasks/some-id', { method: 'DELETE' })
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/some-id/', {
        method: 'DELETE',
      })
    })
  })

  describe('get', () => {
    test('should do a GET request', async () => {
      const client = new FastlaneClient()
      const response = await client.get('tasks')
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'GET',
      })
    })

    test('should do a GET request with querystring', async () => {
      const client = new FastlaneClient()
      const response = await client.get('tasks', { name: 'some-task' })
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?name=some-task',
        {
          method: 'GET',
        },
      )
    })
  })

  describe('post', () => {
    test('should do a POST request', async () => {
      const client = new FastlaneClient()
      const response = await client.post('tasks')
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body: {},
      })
    })

    test('should do a POST request with body', async () => {
      const client = new FastlaneClient()
      const body = { name: 'some-task' }
      const response = await client.post('tasks', body)
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body,
      })
    })
  })

  describe('put', () => {
    test('should do a PUT request', async () => {
      const client = new FastlaneClient()
      const response = await client.put('tasks')
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body: {},
      })
    })

    test('should do a PUT request with body', async () => {
      const client = new FastlaneClient()
      const body = { name: 'some-task' }
      const response = await client.put('tasks', body)
      expect(response).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body,
      })
    })
  })
})

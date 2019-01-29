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
    it('should mount the url from the path', async () => {
      const client = new FastlaneClient()
      const resp = await client.fetch('tasks')
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {})
    })

    it('should override apiUrl from env', async () => {
      process.env.FASTLANE_API_URL = 'http://someother:9090'

      const client = new FastlaneClient()
      const resp = await client.fetch('tasks')
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://someother:9090/tasks/', {})
    })

    it('should mount the url with a querystring', async () => {
      const client = new FastlaneClient()
      const resp = await client.fetch('tasks', {}, { page: 1, filter: 'name' })
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?page=1&filter=name',
        {},
      )
    })

    it('should pass init props to fetch', async () => {
      const client = new FastlaneClient()
      const resp = await client.fetch('tasks/some-id', { method: 'DELETE' })
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/some-id/', {
        method: 'DELETE',
      })
    })
  })

  describe('get', () => {
    it('should do a GET request', async () => {
      const client = new FastlaneClient()
      const resp = await client.get('tasks')
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'GET',
      })
    })

    it('should do a GET request with querystring', async () => {
      const client = new FastlaneClient()
      const resp = await client.get('tasks', { name: 'some-task' })
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith(
        'http://localhost:10000/tasks/?name=some-task',
        {
          method: 'GET',
        },
      )
    })
  })

  describe('post', () => {
    it('should do a POST request', async () => {
      const client = new FastlaneClient()
      const resp = await client.post('tasks', JSON.stringify({}))
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body: '{}',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should do a POST request with body', async () => {
      const client = new FastlaneClient()
      const body = JSON.stringify({
        name: 'some-task',
      })
      const resp = await client.post('tasks', body)
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  })

  describe('put', () => {
    it('should do a PUT request', async () => {
      const client = new FastlaneClient()
      const resp = await client.put('tasks', JSON.stringify({}))
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body: '{}',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should do a PUT request with body', async () => {
      const client = new FastlaneClient()
      const body = JSON.stringify({
        name: 'some-task',
      })
      const resp = await client.put('tasks', body)
      expect(resp).not.toBeNull()
      expect(fetch).toBeCalledWith('http://localhost:10000/tasks/', {
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  })
})

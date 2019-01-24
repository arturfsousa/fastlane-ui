import fetch, { Response } from 'node-fetch'
import { URL } from 'url'

export class FastlaneClient {
  private apiUrl: string = ''

  constructor() {
    this.apiUrl = process.env.FASTLANE_API_URL || 'http://localhost:10000'
  }

  public async get(path: string, qs: object = {}): Promise<Response> {
    const response: Response = await this.fetch(path, { method: 'GET' }, qs)
    return response
  }

  public async post(path: string, body: string): Promise<Response> {
    return await this.fetch(path, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public async put(path: string, body: string): Promise<Response> {
    return await this.fetch(path, {
      method: 'PUT',
      body,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public async fetch(
    path: string,
    init: any = {},
    qs: any = {},
  ): Promise<Response> {
    const url = new URL(`${this.apiUrl}/${path}/`)
    Object.keys(qs).forEach(key => url.searchParams.append(key, qs[key]))

    console.log(
      `Submitting ${init.method} to ${url} (request body: ${init.body})...`,
    )
    return await fetch(url.toString(), init)
  }
}

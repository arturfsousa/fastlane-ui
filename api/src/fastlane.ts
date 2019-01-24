import 'isomorphic-fetch'
import { URL } from 'url'

declare const fetch: any

export class FastlaneClient {
  private apiUrl: string = ''

  constructor() {
    this.apiUrl = process.env.FASTLANE_API_URL || 'http://localhost:10000'
  }

  public async get(path: string, qs: object = {}): Promise<any> {
    return await this.fetch(path, { method: 'GET' }, qs)
  }

  public async post(path: string, body: object = {}): Promise<any> {
    return await this.fetch(path, { method: 'POST', body })
  }

  public async put(path: string, body: object = {}): Promise<any> {
    return await this.fetch(path, { method: 'PUT', body })
  }

  public async fetch(
    path: string,
    init: object = {},
    qs: object = {},
  ): Promise<any> {
    const url = new URL(`${this.apiUrl}/${path}/`)
    Object.keys(qs).forEach(key => url.searchParams.append(key, qs[key]))

    const res = await fetch(url.toString(), init)
    return await res.json()
  }
}

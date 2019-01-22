import 'isomorphic-fetch'
declare const fetch: any

export class FastlaneClient {
  public apiUrl = ''

  constructor() {
    this.apiUrl = process.env.FASTLANE_API_URL || 'http://localhost:10000'
  }

  public async getTasks() {
    const data = await this.request('tasks')
    return data.items
  }

  private async request(path: string) {
    const res = await fetch(`${this.apiUrl}/${path}/`)
    return await res.json()
  }
}

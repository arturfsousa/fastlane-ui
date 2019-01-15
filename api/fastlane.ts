import 'isomorphic-fetch'

class FastlaneClient {
  public apiUrl = ''

  constructor() {
    this.apiUrl = process.env.FASTLANE_API_URL || 'http://localhost:10000'
  }

  public async getTasks() {
    const url = `${this.apiUrl}/tasks`
    const data = await this.request(url)
    return data.items
  }

  private async request(url) {
    const res = await fetch(url)
    return await res.json()
  }
}

module.exports = { FastlaneClient }

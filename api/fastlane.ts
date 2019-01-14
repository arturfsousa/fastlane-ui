require('isomorphic-fetch');

class FastlaneClient {
  apiUrl = '';

  constructor() {
    this.apiUrl = process.env.FASTLANE_API_URL || "http://localhost:10000";
  }

  async request(url) {
    const res = await fetch(url);
    return await res.json();
  }

  async getTasks() {
    const url = `${this.apiUrl}/tasks`;
    const data = await this.request(url);
    return data.items;
  }
}

module.exports = { FastlaneClient };

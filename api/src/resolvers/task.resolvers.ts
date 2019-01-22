import { FastlaneClient } from '../fastlane'

async function getTasks() {
  const client = new FastlaneClient()
  return await client.getTasks()
}

export default {
  Query: {
    tasks: async () => await getTasks(),
  },
}

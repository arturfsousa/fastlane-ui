import { GraphQLServer } from 'graphql-yoga'
import { default as resolvers } from './resolvers'
import { default as typeDefs } from './typeDefs'

const options = { port: 4004 }

const server = new GraphQLServer({
  resolvers,
  typeDefs,
})

server
  .start(options, () =>
    console.log(
      `Fastlane UI server is running ⚡ on localhost:${options.port}`,
    ),
  )
  .catch(err => console.error('Connection error', err))

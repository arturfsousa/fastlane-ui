import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { FastlaneClient } from './fastlane'
import { createSchema } from './schema'

const main = async () => {
  const schema = await createSchema()
  const apolloServer = new ApolloServer({
    schema,
    context: () => ({
      fastlaneClient: new FastlaneClient(),
    }),
  })
  const app = express()
  apolloServer.applyMiddleware({ app })

  const appPort = process.env.API_PORT || 4000
  app.listen(appPort, () => {
    console.log(
      `FastlaneUI server is running ⚡ on http://localhost:${appPort}`,
    )
  })
}

main()

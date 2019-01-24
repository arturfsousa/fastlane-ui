import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './modules/task/TaskResolver'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TaskResolver],
  })

  const apolloServer = new ApolloServer({ schema })
  const app = express()
  apolloServer.applyMiddleware({ app })

  const appPort = process.env.PORT || 4000
  app.listen(appPort, () => {
    console.log(
      `FastlaneUI server is running ⚡ on http://localhost:${appPort}`,
    )
  })
}

main()

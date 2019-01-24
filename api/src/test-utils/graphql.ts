import { graphql, GraphQLSchema } from 'graphql'
import Maybe from 'graphql/tsutils/Maybe'
import 'reflect-metadata'

import { createSchema } from '../schema'

interface Options {
  source: string
  variableValues?: Maybe<{ [key: string]: any }>
  fastlaneClient?: any
}

let schema: GraphQLSchema

export const graphCall = async ({
  source,
  variableValues,
  fastlaneClient,
}: Options) => {
  if (!schema) {
    schema = await createSchema()
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      fastlaneClient: fastlaneClient || jest.fn(),
    },
  })
}

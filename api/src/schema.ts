import { GraphQLObjectType } from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import { buildSchema } from 'type-graphql'

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [`${__dirname}/modules/**/*Resolver.ts`],
    dateScalarMode: 'isoDate',
    scalarsMap: [{ type: GraphQLJSON, scalar: GraphQLJSON }],
  })
}

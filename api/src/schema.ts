import { GraphQLDateTime } from 'graphql-iso-date'
import { buildSchema } from 'type-graphql'

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [`${__dirname}/modules/**/*Resolver.ts`],
    scalarsMap: [{ type: Date, scalar: GraphQLDateTime }],
  })
}

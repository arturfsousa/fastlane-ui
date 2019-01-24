import { Length, MaxLength } from 'class-validator'
import Json from 'graphql-type-json'
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql'

@InputType()
export class NewJobInput {
  @Field()
  public taskId: string

  @Field({ nullable: true })
  public jobId?: string

  @Field()
  public image: string

  @Field()
  public command: string

  @Field(type => Json, { nullable: true })
  public envs?: Json

  @Field({ nullable: true })
  public startIn?: string

  @Field({ nullable: true })
  public startAt?: number

  @Field({ nullable: true })
  public cron?: string

  @Field(type => Json, { nullable: true })
  public metadata?: Json

  @Field(type => Json, { nullable: true })
  public notify?: Json

  @Field(type => Json, { nullable: true })
  public webhooks?: Json

  @Field({ nullable: true })
  public retries?: number

  @Field({ nullable: true })
  public expiration?: number

  @Field({ nullable: true })
  public timeout?: number
}

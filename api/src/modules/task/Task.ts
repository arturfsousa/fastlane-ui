import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Task {
  @Field()
  public taskId: string

  @Field()
  public createdAt: Date

  @Field()
  public lastModifiedAt: Date
}

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Task {
  @Field()
  public taskId: string

  @Field()
  public createdAt: string

  @Field()
  public lastModifiedAt: string
}

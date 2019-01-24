import { Field, ObjectType } from 'type-graphql'

import { Job } from '../job/Job'

export interface FromAPIArgs {
  taskId: string
  createdAt: Date
  lastModifiedAt: Date
}

@ObjectType()
export class Task {
  public static FromAPI({
    taskId,
    createdAt,
    lastModifiedAt,
  }: FromAPIArgs): Task {
    const task = new Task()
    task.taskId = taskId
    task.createdAt = new Date(createdAt)
    task.lastModifiedAt = new Date(lastModifiedAt)
    return task
  }

  @Field()
  public taskId: string

  @Field()
  public createdAt: Date

  @Field()
  public lastModifiedAt: Date

  @Field(type => [Job])
  public jobs: Job[]
}

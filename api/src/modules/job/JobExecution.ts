import { Field, ObjectType } from 'type-graphql'

import { ExecutionDetails } from './ExecutionDetails'

export interface FromAPIArgs {
  executionId: string
  url: string
}

@ObjectType()
export class Execution {
  public static FromAPI(
    taskId: string,
    jobId: string,
    { executionId, url }: FromAPIArgs,
  ): Execution {
    const execution = new Execution()
    execution.taskId = taskId
    execution.jobId = jobId
    execution.executionId = executionId
    execution.executionUrl = url
    return execution
  }

  @Field()
  public taskId: string

  @Field()
  public jobId: string

  @Field()
  public executionId: string

  @Field()
  public executionUrl: string

  @Field()
  public details: ExecutionDetails
}

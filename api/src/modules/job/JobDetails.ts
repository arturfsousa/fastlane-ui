import Json from 'graphql-type-json'
import { Field, Int, ObjectType } from 'type-graphql'

import { Execution } from './JobExecution'

export interface FromAPIArgs {
  executionCount: typeof Int
  createdAt: Date
  lastModifiedAt: Date
  metadata: any
  executions: any[]
  requestIPAddress: string
  scheduled: boolean
}

@ObjectType()
export class JobDetails {
  public static FromAPI(
    taskId: string,
    jobId: string,
    data: FromAPIArgs,
  ): JobDetails {
    const jobDetails = new JobDetails()
    jobDetails.taskId = taskId
    jobDetails.jobId = jobId
    jobDetails.executionCount = data.executionCount
    jobDetails.createdAt = data.createdAt
    jobDetails.lastModifiedAt = new Date(data.lastModifiedAt)
    jobDetails.metadata = data.metadata
    jobDetails.requestIPAddress = data.requestIPAddress
    jobDetails.scheduled = data.scheduled

    const parsedExecutions: Execution[] = []
    for (const jobExecutionData of data.executions) {
      parsedExecutions.push(Execution.FromAPI(taskId, jobId, jobExecutionData))
    }
    jobDetails.executions = parsedExecutions
    return jobDetails
  }

  @Field()
  public taskId: string

  @Field()
  public jobId: string

  @Field(type => Int)
  public executionCount: typeof Int

  @Field()
  public createdAt: Date

  @Field()
  public lastModifiedAt: Date

  @Field(type => Json)
  public metadata: Json

  @Field()
  public requestIPAddress: string

  @Field()
  public scheduled: boolean

  @Field(type => [Execution], { nullable: true })
  public executions: Execution[]
}

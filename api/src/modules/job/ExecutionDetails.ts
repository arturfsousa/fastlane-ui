import Json from 'graphql-type-json'
import { Field, Int, ObjectType, registerEnumType } from 'type-graphql'

enum ExecutionStatus {
  Enqueued = 'enqueued',
  Pulling = 'pulling',
  Running = 'running',
  Done = 'done',
  Failed = 'failed',
  Timedout = 'timedout',
  Expired = 'expired',
  Stopped = 'stopped',
}

registerEnumType(ExecutionStatus, {
  name: 'ExecutionStatus',
  description: 'Status of a Job Execution',
})

export interface FromAPIArgs {
  command: string
  createdAt: string
  error: string
  exitCode: typeof Int
  finishedAt: string
  image: string
  log: string
  metadata: Json
  requestIPAddress: string
  startedAt: string
  status: ExecutionStatus
}

@ObjectType()
export class ExecutionDetails {
  public static FromAPI(
    taskId: string,
    jobId: string,
    executionId: string,
    details: FromAPIArgs,
  ): ExecutionDetails {
    const executionDetails = new ExecutionDetails()
    executionDetails.command = details.command
    executionDetails.createdAt = new Date(details.createdAt)
    executionDetails.error = details.error
    executionDetails.exitCode = details.exitCode
    executionDetails.finishedAt = new Date(details.finishedAt)
    executionDetails.image = details.image
    executionDetails.log = details.log
    executionDetails.metadata = details.metadata
    executionDetails.requestIPAddress = details.requestIPAddress
    executionDetails.startedAt = new Date(details.startedAt)
    executionDetails.status = details.status
    return executionDetails
  }

  @Field()
  public taskId: string

  @Field()
  public jobId: string

  @Field()
  public executionId: string

  @Field()
  public command: string

  @Field()
  public createdAt: Date

  @Field()
  public error: string

  @Field(type => Int)
  public exitCode: typeof Int

  @Field()
  public finishedAt: Date

  @Field()
  public image: string

  @Field()
  public log: string

  @Field(type => Json)
  public metadata: Json

  @Field()
  public requestIPAddress: string

  @Field()
  public startedAt: Date

  @Field(type => ExecutionStatus)
  public status: ExecutionStatus
}

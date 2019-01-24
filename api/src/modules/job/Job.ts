import { Field, ObjectType } from 'type-graphql'

import { JobDetails } from './JobDetails'

export interface FromAPIArgs {
  id: string
  url: string
}

@ObjectType()
export class Job {
  public static FromAPI(taskId: string, { id, url }: FromAPIArgs): Job {
    const job = new Job()
    job.taskId = taskId
    job.jobId = id
    job.jobUrl = url
    return job
  }

  @Field()
  public taskId: string

  @Field()
  public jobId: string

  @Field()
  public jobUrl: string

  @Field({ nullable: true })
  public details?: JobDetails
}

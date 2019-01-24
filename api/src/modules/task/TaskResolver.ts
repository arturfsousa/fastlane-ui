import Json from 'graphql-type-json'
import { Response } from 'node-fetch'

import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql'
import { AppContext } from '../../types/AppContext'
import { Job } from '../job/Job'
import { NewJobInput } from '../job/JobInput'
import { Task } from './Task'

@ObjectType()
export class TaskEnqueueResponse {
  public static FromAPI(data: Json): TaskEnqueueResponse {
    const resp = new TaskEnqueueResponse()
    resp.executionId = data.executionId
    resp.executionUrl = data.executionUrl
    resp.jobId = data.jobId
    resp.jobUrl = data.jobUrl
    resp.queueJobId = data.queueJobId
    resp.taskId = data.taskId
    resp.taskUrl = data.taskUrl
    return resp
  }

  @Field()
  public taskId: string

  @Field()
  public taskUrl: string

  @Field()
  public jobId: string

  @Field()
  public jobUrl: string

  @Field()
  public executionId: string

  @Field()
  public executionUrl: string

  @Field()
  public queueJobId: string
}

@Resolver(of => Task)
export class TaskResolver implements ResolverInterface<Task> {
  @Mutation(returns => TaskEnqueueResponse)
  public async enqueue(
    @Arg('newJobData') newJobData: NewJobInput,
    @Ctx() { fastlaneClient }: AppContext,
  ): Promise<TaskEnqueueResponse> {
    const req: Json = {
      taskId: newJobData.taskId,
      image: newJobData.image,
      command: newJobData.command,
    }

    let response: Response
    if (!!newJobData.jobId) {
      response = await fastlaneClient.put(
        `tasks/${newJobData.taskId}/jobs/${newJobData.jobId}`,
        JSON.stringify(req),
      )
    } else {
      response = await fastlaneClient.post(
        `tasks/${newJobData.taskId}`,
        JSON.stringify(req),
      )
    }
    const body = await response.text()
    const details = JSON.parse(body)
    return TaskEnqueueResponse.FromAPI(details)
  }

  @Query(() => [Task])
  public async tasks(@Ctx() { fastlaneClient }: AppContext): Promise<Task[]> {
    const response = await fastlaneClient.get('tasks')
    const { items } = await response.json()

    const tasks: Task[] = []
    for (const item of items) {
      tasks.push(Task.FromAPI(item))
    }

    return tasks
  }

  @FieldResolver()
  public async jobs(
    @Root() task: Task,
    @Ctx() { fastlaneClient }: AppContext,
  ): Promise<Job[]> {
    const response = await fastlaneClient.get(`tasks/${task.taskId}`)
    const { jobs } = await response.json()

    const jobSummaries: [Job?] = []
    for (const jobSummary of jobs) {
      jobSummaries.push(Job.FromAPI(task.taskId, jobSummary))
    }
    return jobSummaries
  }
}

import Json from 'graphql-type-json'
import { Response } from 'node-fetch'

import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
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
export class TasksResponse {
  public static FromAPI(data: Json): TasksResponse {
    const resp = new TasksResponse()

    const tasks: Task[] = []
    for (const item of data.items) {
      tasks.push(Task.FromAPI(item))
    }

    resp.items = tasks
    resp.hasPrevPage = data.hasPrev
    resp.prevPage = data.hasPrev ? data.page - 1 : data.page

    resp.hasNextPage = data.hasNext
    resp.nextPage = data.hasNext ? data.page + 1 : data.page

    resp.totalPages = data.pages
    resp.perPage = data.perPage
    return resp
  }

  @Field()
  public hasNextPage: boolean

  @Field()
  public nextPage: number

  @Field()
  public hasPrevPage: boolean

  @Field()
  public prevPage: number

  @Field()
  public totalPages: number

  @Field()
  public perPage: number

  @Field(type => [Task])
  public items: Task[]
}

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

  @Query(() => TasksResponse)
  public async tasks(
    @Ctx() { fastlaneClient }: AppContext,
    @Arg('page', { nullable: true }) page?: number,
  ): Promise<TasksResponse> {
    let currentPage = 1
    if (!!page) {
      currentPage = page
    }

    const tasks: Task[] = []
    const response = await fastlaneClient.get('tasks', { page: currentPage })
    if (response.status !== 200) {
      console.log(
        `Response returned status ${
          response.status
        } and text ${await response.text()}`,
      )
      return TasksResponse.FromAPI({
        items: [],
        hasPrev: false,
        hasNext: false,
        page: currentPage,
        pages: 0,
        perPage: 0,
      })
    }

    const data = await response.json()
    return TasksResponse.FromAPI(data)
  }

  @Query(() => TasksResponse)
  public async search(
    @Ctx() { fastlaneClient }: AppContext,
    @Arg('query') query: string,
    @Arg('page', { nullable: true }) page?: number,
  ): Promise<TasksResponse> {
    let currentPage = 1
    if (!!page) {
      currentPage = page
    }

    const tasks: Task[] = []
    const response = await fastlaneClient.get('search', {
      query,
      page: currentPage,
    })
    if (response.status !== 200) {
      console.log(
        `Response returned status ${
          response.status
        } and text ${await response.text()}`,
      )
      return TasksResponse.FromAPI({
        items: [],
        hasPrev: false,
        hasNext: false,
        page: currentPage,
        pages: 0,
        perPage: 0,
      })
    }
    const data = await response.json()
    return TasksResponse.FromAPI(data)
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

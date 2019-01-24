import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql'
import { AppContext } from '../../types/AppContext'
import { Job } from '../job/Job'
import { Task } from './Task'

@Resolver(of => Task)
export class TaskResolver implements ResolverInterface<Task> {
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

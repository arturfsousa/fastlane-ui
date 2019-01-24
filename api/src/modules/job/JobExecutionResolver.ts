import {
  Arg,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql'
import { AppContext } from '../../types/AppContext'
import { ExecutionDetails } from './ExecutionDetails'
import { Execution } from './JobExecution'

@Resolver(of => Execution)
export class JobExecutionResolver implements ResolverInterface<Execution> {
  // @Query(() => Job)
  // public async job(
  // @Ctx() { fastlaneClient }: AppContext,
  // @Arg('taskId') taskId?: string,
  // @Arg('jobId') jobId?: string,
  // ): Promise<Job> {
  // const response = await fastlaneClient.get('tasks')
  // const { items } = await response.json()
  // return new Job()
  // }
  @FieldResolver()
  public async details(
    @Root() rootExecution: Execution,
    @Ctx() { fastlaneClient }: AppContext,
  ): Promise<ExecutionDetails> {
    const response = await fastlaneClient.get(
      `tasks/${rootExecution.taskId}/jobs/${rootExecution.jobId}/executions/${
        rootExecution.executionId
      }`,
    )
    const { execution } = await response.json()
    return ExecutionDetails.FromAPI(
      rootExecution.taskId,
      rootExecution.jobId,
      rootExecution.executionId,
      execution,
    )
  }
}

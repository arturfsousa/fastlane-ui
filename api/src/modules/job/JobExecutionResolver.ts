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
  @Query(() => ExecutionDetails)
  public async execution(
    @Ctx() { fastlaneClient }: AppContext,
    @Arg('taskId') taskId: string,
    @Arg('jobId') jobId: string,
    @Arg('executionId') executionId: string,
  ): Promise<ExecutionDetails> {
    const response = await fastlaneClient.get(
      `tasks/${taskId}/jobs/${jobId}/executions/${executionId}`,
    )
    const { execution } = await response.json()
    return ExecutionDetails.FromAPI(taskId, jobId, executionId, execution)
  }

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

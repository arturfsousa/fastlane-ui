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
import { Job } from '../job/Job'
import { JobDetails } from '../job/JobDetails'
import { Execution } from '../job/JobExecution'

@Resolver(of => Job)
export class JobResolver implements ResolverInterface<Job> {
  @Query(() => JobDetails)
  public async job(
    @Ctx() { fastlaneClient }: AppContext,
    @Arg('taskId') taskId: string,
    @Arg('jobId') jobId: string,
  ): Promise<JobDetails> {
    const response = await fastlaneClient.get(`tasks/${taskId}/jobs/${jobId}`)
    const { job } = await response.json()
    return JobDetails.FromAPI(taskId, jobId, job)
  }

  @FieldResolver()
  public async details(
    @Root() rootJob: Job,
    @Ctx() { fastlaneClient }: AppContext,
  ): Promise<JobDetails> {
    const response = await fastlaneClient.get(
      `tasks/${rootJob.taskId}/jobs/${rootJob.jobId}`,
    )
    const { job } = await response.json()

    const {
      createdAt,
      executionCount,
      lastModifiedAt,
      requestIPAddress,
      scheduled,
    } = job

    const jobDetails = new JobDetails()
    jobDetails.taskId = rootJob.taskId
    jobDetails.jobId = rootJob.jobId
    jobDetails.executionCount = executionCount
    jobDetails.createdAt = createdAt
    jobDetails.lastModifiedAt = new Date(lastModifiedAt)
    jobDetails.metadata = job.metadata
    jobDetails.requestIPAddress = requestIPAddress
    jobDetails.scheduled = scheduled

    const executions: Execution[] = []
    for (const jobExecutionData of job.executions) {
      executions.push(
        Execution.FromAPI(rootJob.taskId, rootJob.jobId, jobExecutionData),
      )
    }
    jobDetails.executions = executions

    return await jobDetails
  }
}

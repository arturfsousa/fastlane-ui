import { Ctx, Query, Resolver } from 'type-graphql'
import { AppContext } from '../../types/AppContext'
import { Task } from './Task'

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  public async tasks(@Ctx() { fastlaneClient }: AppContext): Promise<Task[]> {
    return await fastlaneClient.getTasks()
  }
}

import { Query, Resolver } from 'type-graphql'
import { Task } from './Task'

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  public async tasks(): Promise<Task[]> {
    return []
  }
}

async function getTasks() {
  return [
    {taskId: 'my-task', createdAt: 1547467593, lastModifiedAt: 1547467593},
    {taskId: 'my-task-1', createdAt: 1547467593, lastModifiedAt: 1547467593},
    {taskId: 'my-task-2', createdAt: 1547467593, lastModifiedAt: 1547467593}
  ]
}


export default {
  Query: {
    tasks: async () => await getTasks()
  }
};

class GetTask {
  constructor (taskRepository) {
    this.taskRepository = taskRepository
  }

  async get (id) {
    const taskFound = await this.taskRepository.findTaskById(id)

    if (!taskFound) {
      return 'Task not found'
    } 

    return taskFound
  }
}

module.exports = {
  GetTask
}
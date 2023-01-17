class ListTasks {
  constructor (taskRepository) {
    this.taskRepository = taskRepository
  }

  async list () {
    return await this.taskRepository.findTasks()
  }
}

module.exports = {
  ListTasks
}
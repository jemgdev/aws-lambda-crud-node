const { Task } = require('../domain/task.model')

class CreateTask {
  constructor (taskRepository) {
    this.taskRepository = taskRepository
  }

  async create ({ title, description }) {
    const task = new Task({ title, description })
    return await this.taskRepository.createTask(task)
  }
}

module.exports = {
  CreateTask
}
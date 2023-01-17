class UpdateTask {
  constructor (taskRepository) {
    this.taskRepository = taskRepository
  }

  async update ({ id, title, description }) {
    const taskFound = await this.taskRepository.findTaskById(id)

    if (!taskFound) {
      return 'Task not found'
    } 
    
    return await this.taskRepository.updateTaskById({ id, title, description })
  }
}

module.exports = {
  UpdateTask
}
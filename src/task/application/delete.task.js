class DeleteTask {
  constructor (taskRepository) {
    this.taskRepository = taskRepository
  }

  async delete (id) {
    const taskFound = await this.taskRepository.findTaskById(id)

    if (!taskFound) {
      return 'Task not found'
    } 
    
    return await this.taskRepository.deleteTaskById(id)
  }
}

module.exports = {
  DeleteTask
}
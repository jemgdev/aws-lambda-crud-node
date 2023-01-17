const { CreateTask } = require('./task/application/create.task')
const { DeleteTask } = require('./task/application/delete.task')
const { GetTask } = require('./task/application/get.task')
const { ListTasks } = require('./task/application/list.tasks')
const { UpdateTask } = require('./task/application/update.task')
const { TaskRepository } = require('./task/infrastructure/task.repository')

const taskRepository = new TaskRepository()
const createTask = new CreateTask(taskRepository)
const listTasks = new ListTasks(taskRepository)
const getTask = new GetTask(taskRepository)
const deleteTask = new DeleteTask(taskRepository)
const updateTask = new UpdateTask(taskRepository)

const addTaskHandler = async (event) => {
  const { title, description } = JSON.parse(event.body)

  const taskCreated = await createTask.create({ title, description })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskCreated)
  }
}

const getTasksHandler = async (event) => {
  const tasks = await listTasks.list()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tasks)
  }
}

const getTaskHandler = async (event) => {
  const { id } = event.pathParameters

  const taskFound = await getTask.get(id)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskFound)
  }
}

const deleteTaskHandler = async (event) => {
  const { id } = event.pathParameters

  const newTaskList = await deleteTask.delete(id)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTaskList)
  }
}

const updateTaskHandler = async (event) => {
  const { id } = event.pathParameters
  const { title, description } = JSON.parse(event.body)

  const newTaskList = await updateTask.update({ id, title, description })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTaskList)
  }
}

module.exports = {
  addTaskHandler,
  getTasksHandler,
  getTaskHandler,
  deleteTaskHandler,
  updateTaskHandler
}
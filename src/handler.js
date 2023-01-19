const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const dynamodb = new AWS.DynamoDB.DocumentClient()

const addTaskHandler = async (event) => {
  const { title, description } = JSON.parse(event.body)

  const newTask = {
    id: v4(), 
    title, 
    description, 
    createdAt: new Date().toISOString()
  }

  await dynamodb.put({
    TableName: 'TaskTable',
    Item: newTask
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  }
}

const getTasksHandler = async () => {

  const { Items } = await dynamodb.scan({
    TableName: 'TaskTable'
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Items)
  }
}

const getTaskHandler = async (event) => {
  const { id } = event.pathParameters

  const { Item } = await dynamodb.get({
    TableName: 'TaskTable',
    Key: {
      id
    }
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Item)
  }
}

const deleteTaskHandler = async (event) => {
  const { id } = event.pathParameters

  await dynamodb.delete({
    TableName: 'TaskTable',
    Key: {
      id
    }
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify('Task deleted')
  }
}

const updateTaskHandler = async (event) => {
  const { id } = event.pathParameters
  const { title, description } = JSON.parse(event.body)

  await dynamodb.update({
    TableName: 'TaskTable',
    Key: {
      id
    },
    UpdateExpression: 'set title = :title, description = :description',
    ExpressionAttributeValues: {
      ':title': title,
      ':description': description
    }
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify('Task updated')
  }
}

module.exports = {
  addTaskHandler,
  getTasksHandler,
  getTaskHandler,
  deleteTaskHandler,
  updateTaskHandler
}
const AWS = require('aws-sdk')

class TaskRepository {
  constructor () {
    this.dynamodb = new AWS.DynamoDB.DocumentClient()
  }

  async findTasks () {
    const { Items } = await this.dynamodb.scan({
      TableName: 'TaskTable'
    }).promise()
    return Items
  }

  async createTask ({ id, title, description, createdAt }) {
    await this.dynamodb.put({
      TableName: 'TaskTable',
      Item: { id, title, description, createdAt }
    }).promise()
    return { id, title, description, createdAt }
  }

  async findTaskById (id) {
    const { Item } = await this.dynamodb.get({
      TableName: 'TaskTable',
      Key: {
        id
      }
    }).promise()

    return Item
  }

  async deleteTaskById (id) {
    await this.dynamodb.delete({
      TableName: 'TaskTable',
      Key: {
        id
      }
    }).promise()
    return 'Task deleted'
  }

  async updateTaskById ({ id, title, description }) {
    await this.dynamodb.update({
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

    return 'Task updated'
  }
}

module.exports = {
  TaskRepository
}
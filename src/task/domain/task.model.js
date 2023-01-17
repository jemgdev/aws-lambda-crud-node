const { v4 } = require('uuid')

class Task {
  constructor ({ title, description }) {
    this.id = v4()
    this.title = title
    this.description = description
    this.createdAt = new Date().toISOString()
  }
}

module.exports = {
  Task
}
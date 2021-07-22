
const task = require('../dal/task')

const taskService = {
  // taskService.getById(id)
  getById: id =>
        task.findById(id)

  // taskService.getAll()
  ,getAll: () => task.find()

  ,set: emp => {
    if( emp.id )
      return task.update( emp.id, emp )
    else
      return task.insert( emp )
  }

  ,del: id => task.remove(id)
}

// exporting service
module.exports.taskService = taskService

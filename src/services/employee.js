
const employee = require('../dal/employee')

const employeeService = {
  // employeeService.getById(id)
  getById: id =>
        employee.findById(id)

  // employeeService.getAll()
  ,getAll: () => employee.find()

  ,set: emp => {
    if( emp.id )
      return employee.update( emp.id, emp )
    else
      return employee.insert( emp )
  }

  ,del: id => employee.remove(id)
}

// exporting service
module.exports.employeeService = employeeService

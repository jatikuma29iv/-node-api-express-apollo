//services
const { employeeService } = require('services/employee')
const { taskService }     = require('services/task')
//utils
const NotFoundError = require('lib/not_found_error')
const readFileSync  = require('lib/read_file_sync')

module.exports = {
  Query: {
    // resolver: (parent,args,context,info) <- options params
    // here '_' <- parent
    tasks: () => taskService.getAll(),
    task: (_, { id }) => taskService.getById(id) || new NotFoundError(),
  }, // end Query

  // join resolvers
  Task: {
    employee: (_) => employeeService.getById(_.employee_id)
  }
}


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
    employees: () => employeeService.getAll(),
    employee: (_, { id }) => employeeService.getById(id) || new NotFoundError(),
  }, // end Query

  // join resolvers
  Employee: {
    // resolver: (parent,args,context,info) <- options params
    tasks: (_) => taskService.getByEmpId(_.id)
  },
}

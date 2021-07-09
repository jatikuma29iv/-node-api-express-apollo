const _ = require('lodash')

const employeeRepo = [
  { id: 1001, name: 'bob',   age: '31', sex: 'm' },
  { id: 1002, name: 'alice', age: '28', sex: 'f' },
  { id: 1003, name: 'eve',   age: '25', sex: 'f' },
]

const employeeService = {
  // employeeService.getById(id)
  getById: id =>
        _.find(employeeRepo, x => x.id == id)

  // employeeService.getAll()
  ,getAll: () => employeeRepo
}

// default export
module.exports = (router) => {

  router
    .get('/employee', (req,res,next) =>
        res.json(employeeService.getAll())
    )

    .get('/employee/:id', (req, res, next) =>
      res.json(employeeService.getById(req.params.id))
    )
}

// exporting service
module.exports.employeeService = employeeService

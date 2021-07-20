
const { employeeService } = require('../services/employee')

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

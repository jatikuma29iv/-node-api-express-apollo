
const { employeeService } = require('../services/employee')

// default export
module.exports = (router) => {

  router
    .get('/employee', async (req,res,next) => {

      const data = await employeeService.getAll()

      if(data.err)
        res.status(400).send(data.err)
      else
        res.send(data)
    })

    .get('/employee/:id', async (req, res, next) => {

      const data = await employeeService.getById(req.params.id)

      if(data.err)
        res.status(400).send(data.err)
      else
        res.send(data)
    })
}

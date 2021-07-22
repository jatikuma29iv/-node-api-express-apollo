
const { taskService } = require('../services/task')

// default export
module.exports = (router) => {

  router
    .get('/task', async (req,res,next) => {

      const data = await taskService.getAll()

      if(data.err)
        res.status(400).send(data.err)
      else
        res.send(data)
    })

    .get('/task/:id', async (req, res, next) => {

      const data = await taskService.getById(req.params.id)

      if(data.err)
        res.status(400).send(data.err)
      else
        res.send(data)
    })
}

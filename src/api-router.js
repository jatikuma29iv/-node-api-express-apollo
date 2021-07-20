
const router = require('express').Router();

const logger = require('./api-logger').getLogger('api-router');

const uploadCtrl = require('./controllers/Upload');

// add employee endpoint
require('./controllers/employee')(router);

module.exports = router
  .get('/', (req,res) => {
    return res.send('<h1>api</h1>');
  })
  .post('/upload', uploadCtrl.upload)
;

// npm libs
const sql = require('mssql');

var logger = require('app-logger').getLogger('dal/db');

//logger.info('FEDBENCRYPT ' + (process.env.FEDBENCRYPT == 'true' ? true : false));

var config = {
  user: process.env.FEDBUSER,                   // mssql
  password: process.env.FEDBPASS,               // mssql
  database: process.env.FEDB,                   // mssql
  server: process.env.FEDBSERVER,               // tedious
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000

  },
  options: {
    encrypt: (process.env.FEDBENCRYPT == 'true' ? true : false)
  }
}


// Create connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
        logger.info('Connected to MSSQL')
        return pool
      })
  .catch(err => logger.error('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}

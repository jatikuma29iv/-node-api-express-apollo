// adds src to NODE_PATH
require('app-module-path/register');


// load env variables
require('dotenv').config();

var logger=require('./api-logger').getLogger('api');

const rTracer = require('cls-rtracer')

const device = require('express-device');

const useragent = require('express-useragent');

const appmorgan  = require('./api-morgan');

const helmet = require("helmet");

const express = require('express');

const { graphqlHTTP } = require('express-graphql')

const bodyParser = require('body-parser');

const app = express();

const router = require('./api-router');

// adding graphql
const schema = require('./schema')

const port = process.env.PORT || 3000;

app
  .use(rTracer.expressMiddleware({
     useHeader: true,
     headerName: 'X-Sid-Ref'
   }))

// session & refid
  .use((req,res,next) => {
  
    var sessionId = req.headers['x-session'];
  
    if (sessionId) {
      req.sessionId = sessionId;
    }
    next();
  })

  .use(device.capture()) // requred by appmorgan

  .use(useragent.express()) // requred by appmorgan

  .use(appmorgan)

  //.use(helmet())

  .use(bodyParser.urlencoded({ extended: true }))

  .use(bodyParser.json())

  .use((req,res,next) => {

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        logger.error('ERR REQUEST - ' + JSON.stringify({
          req: {
            headers:req.headers,
            query:req.query,
            params:req.params,
            body:req.body
          }
        }));
      }
    });

    next();
  })

  .use((err,req,res,next) =>{
     if(err.name === 'ValidationError')
     {
         var valErrors = [];
         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
         res.status(422).send(valErrors);
     }
      next();
   })

  .use('/api', router)

  .use('/graphql', graphqlHTTP({ schema, graphiql: true }))

  .listen(port, () => {
    logger.info(`Running API server at http://localhost:${port}/api`)
    logger.info(`Running a GraphQL API server at http://localhost:${port}/graphql`)
  })
;

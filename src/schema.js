const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { stitchingDirectives } = require('@graphql-tools/stitching-directives');

//utils
const NotFoundError = require('./lib/not_found_error')
const readFileSync = require('./lib/read_file_sync')

//services
const { employeeService } = require('./services/employee')
const { taskService } = require('./services/task')

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } = stitchingDirectives();

const typeDefs = `
  ${stitchingDirectivesTypeDefs}
  ${readFileSync(__dirname, 'schema.graphql')}
`;

const schema = makeExecutableSchema({
  schemaTransforms: [stitchingDirectivesValidator],

  typeDefs,

  resolvers: {
    Query: {
      // resolver: (parent,args,context,info) <- options params
      // here '_' <- parent
			employee: (_, { id }) => employeeService.getById(id) || new NotFoundError(),
			employees: () => employeeService.getAll(),
			task: (_, { id }) => taskService.getById(id) || new NotFoundError(),
			tasks: () => taskService.getAll(),
      _sdl: () => typeDefs,
    }, // end Query

    // join resolvers
    Employee: {
      // resolver: (parent,args,context,info) <- options params
      tasks: (_) => taskService.getByEmpId(_.id)
    },
    Task: {
      employee: (_) => employeeService.getById(_.employee_id)
    }
  } // end resolvers
})

// startApolloServer
module.exports = async ( app, path='/graphql' ) => {
  const server = new ApolloServer({ typeDefs, schema })

  await server.start()

  server.applyMiddleware({ app, path })

  return server
}

const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { stitchingDirectives } = require('@graphql-tools/stitching-directives');

const NotFoundError = require('./lib/not_found_error')
const readFileSync = require('./lib/read_file_sync')

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
			employee: (_root, { id }) => employeeService.getById(id) || new NotFoundError(),
			employees: () => employeeService.getAll(),
			task: (_root, { id }) => taskService.getById(id) || new NotFoundError(),
			tasks: () => taskService.getAll(),
      _sdl: () => typeDefs,
    },
  }
})

// startApolloServer
module.exports = async ( app, path='/graphql' ) => {

  const server = new ApolloServer({ schema })

  await server.start()

  server.applyMiddleware({ app, path })

  return server
}

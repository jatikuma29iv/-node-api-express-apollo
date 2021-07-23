
const path = require('path')
const { ApolloServer }   = require('apollo-server-express')
const { loadFilesSync }  = require('@graphql-tools/load-files')
const { mergeTypeDefs }  = require('@graphql-tools/merge')
const { mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
//const { stitchingDirectives }  = require('@graphql-tools/stitching-directives');

//const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } = stitchingDirectives();

const typesArray = loadFilesSync(path.join(__dirname, './graphql'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)

const resolversArray = loadFilesSync(path.join(__dirname, './graphql'), { extensions: ['js'] })
const resolvers = mergeResolvers(resolversArray)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// startApolloServer
module.exports = async ( app, path='/graphql' ) => {
  const server = new ApolloServer({ typeDefs, schema })

  await server.start()

  server.applyMiddleware({ app, path })

  return server
}

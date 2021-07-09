
const { employeeService } = require('./employee-controller')

const { graphqlHTTP } = require('express-graphql')

const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    employee(id: Int!): Employee,
    employees: [Employee]
  }
  type Employee {
    id: Int!,
    name: String!,
    age: Int!,
    sex: String!
  }
`)

const rootResolver = {
  employee: graphqlInput => employeeService.getById(graphqlInput && graphqlInput.id)
  ,employees: () => employeeService.getAll()
}

module.exports = graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: true
})


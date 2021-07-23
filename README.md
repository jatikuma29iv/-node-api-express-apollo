# node-api-express-apollo

`nodejs` `api` boilerplate with both `REST` & `GraphQL` protocols. Made with:
- express
- apollo-server-express
- graphql
- kenx
- sqlite3
- log4js

`GraphQL` is implemented with `schema merging` (`typeDefs` & `resolvers`)

## Run

1. Migrate database

```bash
npx knex migrate:latest

npx knex seed:run
```

2.1 to execute with `docker`

```bash
docker build -t api . && docker run --rm --name mpa -p 3000:3000 api
```

2.2 to run with node

```bash
# make sure nodemon is installed
npm install -g nodemon

# run with
npm install

nodemon
```

## REST endpoint examples

http://localhost:3000/api/employee

http://localhost:3000/api/task

## GraphQL query examples

open `GraphiQL` with url http://localhost:3000/graphql

### Queries
- simple query

```graphql

query getAll {
  employee(id: 1003) {
    id
    name
    age
    sex
  }
  employees {
    id
    name
    age
    sex
    created_at
  }
  tasks {
    id
    title
    description
    is_complete
    created_at
  }
}
```

- query with variable

```graphql
query ($id: Int!) {
  employees {
    id
    name
    age
    sex
    tasks {
      title
      description
    }
  }
  
  employee(id: $id) {
    id
    name
    age
    sex
    tasks {
      title
      description
    }
  }
}
```

```graphql
//set variable

{
  "id": 1002
}
```

- query with `join`

```graphql
query Query {
  tasks {
    title
    description
    is_complete
    employee {
      name
      sex
      tasks {
        title
        description
        is_complete
        employee {
          name
          sex
        }
      }
    }
  }
}
```

## How tos 

### Add `GraphQl`

```bash
npm i apollo-server-express graphql \
		@graphql-tools/load-files \
		@graphql-tools/merge \
		@graphql-tools/schema \
		-s
```

### Create Joins in `GraphQL`

In this examle:
<pre>
`Query.employees()` -> `Employee.tasks(parent)` -> `Task.employee(parent)`
`Query.employee()`  -> `Employee.tasks(parent)` -> `Task.employee(parent)`
`Query.tasks()`     -> `Task.employee(parent)`
`Query.task()`      -> `Task.employee(parent)`
    ^                    ^                           ^
    |                    |                           |
  is Query                ------ are additional -----
                       resolvers sibling to Query object
</pre>
ref: [Resolvers: How to create GraphQl Joins](https://www.apollographql.com/docs/apollo-server/data/resolvers/)

### Add db
```bash
npm i knex sqlite3 -s
```

for migration
```bash
npx knex init

npx knex migrate:make create-employee
npx knex migrate:make create-task

npx knex migrate:latest

npm knex seed:make 01-employee
npm knex seed:make 01-task

npx knex seed:run
```

## TODO

configure helmet to run `GraphiQL` UI

[Federation](https://www.apollographql.com/docs/federation/quickstart/)

[Join Query optimization](https://blog.smartive.ch/graphql-and-mysql-solving-the-join-problem-191f40b55961)

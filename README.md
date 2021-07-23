# api

## TODO

configure helmet to run `GraphiQL` UI

## how it works

run the api

```bash
docker build -t ma . && docker run --rm --name ma -p 3000:3000 ma
```

open `GraphiQL` with url

```url
http://localhost:3000/graphql
```

1. execute simple query

```json

query getSDL {
  _sdl
}

query myTest {
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

1. set variable

```json
{
  "id": 1002
}
```

execute query

```json
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

`Query` with `Join`

```bash
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


## Adding `GraphQl`

```bash
npm i apollo-server-express graphql \
		@graphql-tools/schema \
		@graphql-tools/stitching-directives \
		-s
```

- Query Joins

In this case:
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

## Adding db
npm i knex sqlite3 -s

- Migration
```bash
npx knex init

npx knex migrate:make create-employee
npx knex migrate:make create-task

npx knex migrate:latest

npm knex seed:make 01-employee
npm knex seed:make 01-task

npx knex seed:run
```

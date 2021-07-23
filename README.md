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
  }
  
  employee(id: $id) {
    id
  }
}
```


## Adding `GraphQl`

npm i apollo-server-express graphql \
		@graphql-tools/schema \
		@graphql-tools/stitching-directives \
		-s

## Adding db
npm i knex sqlite3 -s

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
http://localhost:3000/api/___graphql
```

1. execute simple query

```json
{
  employees {
    id
    name
    sex
    age
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

npm i express-graphql graphql -s

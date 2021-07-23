
// Update with your config settings.
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: `./data/${process.env.SQLITE_FILENAME || "api.sqlite"}`
    },

    // necessary when using sqlite3
    useNullAsDefault: true,
    migrations: {
      directory: `./src/dal/migrations`
    },
    seeds: {
      directory: `./src/dal/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

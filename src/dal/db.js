
const knex = require('knex')
const config = require('../../knexfile')

const db = knex(config[ process.env.DB_CONFIG || 'development' ])

module.exports.db = db

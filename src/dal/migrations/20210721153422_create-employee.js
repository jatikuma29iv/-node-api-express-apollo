
exports.up = function(knex) {
  return knex.schema.createTable('employee', table => {
    table.increments()
    table.string('name').notNullable()
    table.integer('age').notNullable()
    table.string('sex').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('Updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('employee')
};

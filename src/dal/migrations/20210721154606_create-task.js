
exports.up = function(knex) {
  return knex.schema.createTable('task', table => {
		table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.boolean('is_complete').notNullable().defaultTo(false);
    table.integer('employee_id').references('id').inTable('employee');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('task')
}

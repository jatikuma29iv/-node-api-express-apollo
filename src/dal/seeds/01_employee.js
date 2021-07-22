
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employee').del()
    .then(function () {
      // Inserts seed entries
      return knex('employee').insert([
        { id: 1001, name: 'bob',   age: '31', sex: 'm' },
        { id: 1002, name: 'alice', age: '28', sex: 'f' },
        { id: 1003, name: 'eve',   age: '25', sex: 'f' },
      ]);
    });
};

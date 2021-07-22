
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {id: 1, title: 'Send msg 1', description: 'send message 1', is_complete: true, employee_id: 1001},
        {id: 2, title: 'Receive msg 1', description: 'Receive message 1', is_complete: false, employee_id: 1002},
        {id: 3, title: 'Intercept msg 1', description: 'Intercept message 1', is_complete: false, employee_id: 1003},
        {id: 4, title: 'Send msg 2', description: 'send message 2', is_complete: false, employee_id: 1001},
        {id: 5, title: 'Receive msg 2', description: 'Receive message 2', is_complete: false, employee_id: 1002},
        {id: 6, title: 'Intercept msg 2', description: 'Intercept message 2', is_complete: false, employee_id: 1003},
      ]);
    });
};

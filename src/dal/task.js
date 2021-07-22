const { db } = require('./db')

module.exports = {

  find: async () => {
		try {
			return await db('task')
		}
		catch(error) {
			return { err: error }
		}
	},

  findById: async id => {
		try {
			return (await db('task')
                    .where({ id: Number(id) }))[0] || {} // {} => data not found
		}
		catch(error) {
			return { err: error }
		}
	},

  insert: newEmployee => db('task')
                          .insert(newEmployee)
                          .then(ids => ({ id: ids[0] })),

  update: (id, task) => db('task')
                              .where('id', Number(id))
                              .update(task),

  remove: id => db('task')
                  .where('id', Number(id))
                  .del()
}

const { db } = require('./db')

module.exports = {

  find: async () => {
		try {
			return await db('employee')
		}
		catch(error) {
			return { err: error }
		}
	},

  findById: async id => {
		try {
			return (await db('employee')
                    .where({ id: Number(id) }))[0] || {} // {} => data not found
		}
		catch(error) {
			return { err: error }
		}
	},

  insert: newEmployee => db('employee')
                          .insert(newEmployee)
                          .then(ids => ({ id: ids[0] })),

  update: (id, employee) => db('employee')
                              .where('id', Number(id))
                              .update(employee),

  remove: id => db('employee')
                  .where('id', Number(id))
                  .del()
}

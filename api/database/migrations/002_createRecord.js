exports.up = async (knex) => {
  await knex.schema.createTable('record', (table) => {
    table.increments('id').primary()
    table.string('item', 100).notNullable()
    table.string('owner', 100).notNullable()
    table.integer('price').notNullable()
    table.boolean('isDeleted').defaultTo(false)
    table.timestamp('createDate', { useTz: true }).defaultTo(knex.fn.now())
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('record')
}

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddProviderUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.boolean('admin')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddProviderUserSchema

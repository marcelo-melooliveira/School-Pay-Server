'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.table('students', (table) => {
      // alter table
      table.float('valor_mensalidade')
    })
  }

  down () {
    this.table('students', (table) => {
      // reverse alternations
    })
  }
}

module.exports = StudentSchema

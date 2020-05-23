'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.bigInteger('matricula')
      table.string('cpf', 15)
      table.string('rg', 15)
      table.string('endereço', 254)
      table.string('telefone', 15)
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema

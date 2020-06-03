'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.float('valor_mensalidade')
      table.string('username')
      table.string('matricula')
      table.string('cpf')
      table.string('rg')
      table.string('endereco')
      table.string('telefone')
      table.string('nome_responsavel')
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema

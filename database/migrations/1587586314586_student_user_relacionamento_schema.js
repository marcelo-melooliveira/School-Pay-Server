'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentUserRelacionamentoSchema extends Schema {
  up () {
    this.create('student_user_relacionamentos', (table) => {
      table.increments()
      
      table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.integer('student_id')
      .notNullable()
      .references('id')
      .inTable('students')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
     
      table.timestamps()
    })
  }

  down () {
    this.drop('student_user_relacionamentos')
  }
}

module.exports = StudentUserRelacionamentoSchema

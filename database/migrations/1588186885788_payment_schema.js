'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
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

      table.string('preference').notNullable()

      table.string('tipo_pagamento')
      
      table.string('status').notNullable()

      table.string('ref')

      table.timestamp('data_criacao', { useTz: false });
      table.timestamp('data_pagamento', { useTz: false });

      table.timestamps();

    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema

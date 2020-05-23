'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
  user(){
    return this.belongsTo('App/Models/User')
  }

  student(){
    return this.belongsTo('App/Models/Student')
  }
}

module.exports = Payment

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StudentUserRelacionamento extends Model {

  user(){
    return this.belongsTo('App/Models/User')
  }

  student(){
    return this.belongsTo('App/Models/Student')
  }
}

module.exports = StudentUserRelacionamento

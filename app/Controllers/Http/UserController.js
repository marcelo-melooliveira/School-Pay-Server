'use strict'

const User = use('App/Models/User')

class UserController {

  async store ({request}){
    const data = request.only(['username', 'email', 'password', 'admin'])

    const user = User.create(data)
    return user

  }

}

module.exports = UserController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
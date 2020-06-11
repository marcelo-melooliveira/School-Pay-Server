'use strict'

const User = use('App/Models/User')

class UserController {

  async store ({request}){
    const data = request.only(['nome', 'sobrenome', 'cpf', 'email', 'password', 'admin'])
    const user = User.create(data)
    return user

    //criar multi usuarios
    // const users = request.input("users");
    // const user = User.createMany(users)
    // return user

  }

}

module.exports = UserController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
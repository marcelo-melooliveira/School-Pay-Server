'use strict'
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }){
    try{
      const {email, password} = request.all()
      const user = await User.findByOrFail('email', email)

      if(user){
        const token = await auth.attempt(email, password)

        const { nome, sobrenome, admin} = user;

    return response.json({
      user: {
        nome,
        sobrenome,
        email,
        admin
      },
      token: token.token
    });
      }
      

    //return token

    } catch(err){
      console.log(err)
    }
    
  }
}

module.exports = SessionController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
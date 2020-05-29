'use strict'
const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({request, response}){
    try{

      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token},
        message =>{
          message
          .to(user.email)
          .from('mm.ifce@gmail.com', 'Marcelo Melo')
          .subject('Recuperação de senha')
        }
      )

    } catch (err) {
        return response.status(err.status).send({error: {message:'Algo não deu certo, esse email existe?'}})
    }

  }


  async update({ request, response }){

    //console.log("entrou no update")

    try{
        const { token, password } = request.all()

        const user = await User.findByOrFail('token', token)

        const tokenExpired = moment().subtract('2','days').isAfter(user.token_created_at)

        if(tokenExpired){
          return response.status(401)
          .send({error: {message:'O token de recuperação está expirado'}})
        }

        user.token = null
        user.token_created_at = null
        user.password = password

        await user.save()

    } catch(err){
      console.log("deu erro no update")
      return response.status(err.status).send({error: {message:'Algo deu errado ao resetar sua senha'}})
    }

  }
}

module.exports = ForgotPasswordController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
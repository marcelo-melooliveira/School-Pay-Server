'use strict'
const Payment = use('App/Models/Payment')

class UserpaymentController {
  async index({auth}){
    const payment_user = await Payment.query()
                                      .where({user_id:auth.user.id})
                                      .orderBy('data_criacao', 'desc')
                                      .with('student')
                                      .fetch()
    return payment_user
 }
}

module.exports = UserpaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
'use strict'
const Payment = use('App/Models/Payment')
class StatusPaymentController {
  
 async update({response, params}){
    const {ref, message} = params

    try{
      const payment = await Payment.findByOrFail({ref: ref})
      payment.status = message,
      payment.data_pagamento = new Date
      await payment.save()
      //return payment 
      return response.status(200).send('ok')

    } catch(err){
        return response.status(401).send({error: 'Pagamento não encontrado'})
    }
  }

  
}

module.exports = StatusPaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
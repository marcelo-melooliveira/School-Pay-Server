'use strict'
const Payment = use('App/Models/Payment')
const MercadoPago = require('mercadopago')
const Env = use('Env')
const axios = require('axios');

class StatusPaymentController {

  async show({response, params}){
    const {ref} = params
    try{
      const payment = await Payment.findByOrFail({ref: ref})

      return payment

    } catch(err){
        return response.status(401).send({error: 'Pagamento não encontrado'})
    }

  }
  
 async update({response, request, params}){
   
  MercadoPago.configure({
    sandbox: Env.get('MP_SANDBOX'),
    access_token: Env.get('MP_ACCESS_TOKEN'),
  });

    const {ref} = params
    const { data, action } = request.all()
    try{
      //const payment = await Payment.findByOrFail({ref: ref})
      // payment.status = 'message',
      // payment.data_pagamento = new Date
      // await payment.save()
      // //return payment 
      // return response.status(200).send('ok')
      
      const payment = await Payment.findByOrFail({ref: ref})
      if(action === 'payment.created'){
        payment.status = 'Pendente';
        payment.preference = data.id;
        const novo_pay = await payment.save();
        return response.status(200).send(novo_pay)
      }
      else if(action === 'payment.updated'){
            const res = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}?access_token=${Env.get('MP_ACCESS_TOKEN')}`);
            
          if(res.data.status == 'approved'){
              payment.status = 'Pago';
              payment.data_pagamento = res.data.date_last_updated;
              payment.valor_pago = res.data.transaction_details.total_paid_amount;
            }else if(res.data.status == 'pending'){
              payment.status = 'Pendente';
              payment.valor_pago = 0;
            }
            const novo_pay = await payment.save();
            return response.status(200).send({sucess: novo_pay})
      }

      return response.status(200).send('ok')
      //return ({date1: payment, status: res.data.status, total_pago : res.data.transaction_details.total_paid_amount}) 

    } catch(err){
        return response.status(401).send({error: err})
    }
  }


  // async update_cartao({response, params}){
   
  //   MercadoPago.configure({
  //     sandbox: Env.get('MP_SANDBOX'),
  //     access_token: Env.get('MP_ACCESS_TOKEN'),
  //   });
  //     const {ref, collection_id, collection_status} = params
  //       const payment = await Payment.findByOrFail({ref: ref})
  //       payment.status = message

  //       if(message === 'Pago'){
  //         payment.data_pagamento = new Date
  //       }
        
  //       await payment.save()
  //       //return payment 
  //       return response.status(200).send('ok')
        
       
  //     }
  
  
}

module.exports = StatusPaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
'use strict'
const Payment = use('App/Models/Payment')
const MercadoPago = require('mercadopago');
const Env = use('Env')
const UIDGenerator = require('uid-generator');

class PaymentController {

  async store({ request, response, auth }){
  
    MercadoPago.configure({
      sandbox: Env.get('MP_SANDBOX'),
      access_token: Env.get('MP_ACCESS_TOKEN'),
    });

    const { student_id, email, description, amount } = request.all()

    const pay =  await Payment.create({
      user_id: auth.user.id,
      student_id: student_id,
      preference: 'nula',
      status: 'Pendente',
    });
    
    const item = {
        title: description,
        description : description,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: parseFloat(amount),
      }

    //Create purchase item object template
    const purchaseOrder = {
        items: [item],
        payer : {
          email: email
        },
        // "payment_methods": {
        //   "excluded_payment_types":[
        //       {"id":"credit_card"}
        //   ]
        // },
        auto_return : "all",
        //external_reference : id,
        
        back_urls : {
          success : "http://68.183.156.246:3000/payments/success/?user=teste",
          pending : "http://68.183.156.246:3000/payments/pending/?user=teste",
          failure : "http://68.183.156.246:3000/payments/failure/?user=teste",
        }
      }
  
      //Generate init_point to checkout
      try {
        const preference = await MercadoPago.preferences.create(purchaseOrder);
        //console.log(preference)
      

        pay.preference = preference.body.id;
        const sucess = await pay.save();

        if(sucess)
        return preference.body.sandbox_init_point
        //return response.redirect(`${preference.body.sandbox_init_point}`);

        
      }catch(err){
        return response.send(err.message);
      }

  }



async boleto({ request, response, auth }){

  MercadoPago.configure({
    sandbox: Env.get('MP_SANDBOX'),
    access_token: Env.get('MP_ACCESS_TOKEN'),
  });

  const { student_id, email, description } = request.all()

 const uidgen = new UIDGenerator();
 const ref = await uidgen.generate();

console.log("entrou no boleto")

  const pay =  await Payment.create({
    user_id: auth.user.id,
    student_id: student_id,
    preference: 'nula',
    tipo_pagamento: 'boleto',
    status: 'Pendente',
    ref: ref,
    data_criacao: new Date()
  });

  let payment_data = {
    transaction_amount: 100,
    description: description,
    payment_method_id: 'bolbradesco',
    payer: {
      email: email,
      first_name: 'Laura',
      last_name: 'Tais',
      identification: {
          type: 'CPF',
          number: '19119119100'
      },
      address:  {
          zip_code: '06233200',
          street_name: 'Av. das Nações Unidas',
          street_number: '3003',
          neighborhood: 'Bonfim',
          city: 'Osasco',
          federal_unit: 'SP'
      }
    }
  };

  try{
    const data = await MercadoPago.payment.create(payment_data)
    pay.preference = data.body.id;
    const sucess = await pay.save();
    if(sucess){
      //console.log("chegou no sucess")
      return ({url: data.body.transaction_details.external_resource_url, barcode: data.body.barcode.content})
     
    }
      

  }catch(err){
    return response.send(err.message);
  }
  

}

}

module.exports = PaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
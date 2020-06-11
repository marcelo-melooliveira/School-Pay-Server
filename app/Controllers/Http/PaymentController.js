'use strict'
const Payment = use('App/Models/Payment')
const Student = use('App/Models/Student')
const MercadoPago = require('mercadopago')
const Env = use('Env')
const UIDGenerator = require('uid-generator')

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

  let {   student_id,
          first_name,
          last_name,
          email,
          cpf,
          description,
          valor_mensalidade,
          data_ref } = request.all()
 
    if(auth.user.admin == false){
      try{
        const student = await Student.findByOrFail('id', student_id);
          valor_mensalidade = student.valor_mensalidade
          first_name = auth.user.nome
          last_name = auth.user.sobrenome;
          email = auth.user.email
          cpf = auth.user.cpf
          description = `Mensalidade SchoolPay - ${student.username}`

      }catch(err){
        return ({sucess: false, error: 'Aluno não encontado'})
      }
    }

    if(valor_mensalidade == null || valor_mensalidade == 0){
      return ({sucess: false, error: 'A mensalidade não pode ser zero'})
    }
    
   // console.log({first_name, last_name, cpf, email, description, admin: auth.user.admin, valor_mensalidade})
    //return ({first_name, last_name, cpf, email, description, admin: auth.user.admin, valor_mensalidade})

 const uidgen = new UIDGenerator();
 const ref = await uidgen.generate();


  const pay =  await Payment.create({
    user_id: auth.user.id,
    student_id: student_id,
    preference: 'nula',
    tipo_pagamento: 'boleto',
    status: 'S/N',
    ref: ref,
    data_criacao: new Date(),
    data_ref: data_ref

  });

  let payment_data = {
    transaction_amount: valor_mensalidade,
    description: description,
    payment_method_id: 'bolbradesco',
    payer: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      identification: {
          type: 'CPF',
          number: cpf
      },
      // address:  {
      //     zip_code: '06233200',
      //     street_name: 'Av. das Nações Unidas',
      //     street_number: '3003',
      //     neighborhood: 'Bonfim',
      //     city: 'Osasco',
      //     federal_unit: 'SP'
      // }
    },
    notification_url :`https://mellus.com.br/update-status-payment/${ref}`,
  };

  try{
    const data = await MercadoPago.payment.create(payment_data)
    pay.preference = data.body.id;
    const sucess = await pay.save();
    if(sucess){
      //console.log("chegou no sucess")
      return ({sucess: true, url: data.body.transaction_details.external_resource_url, barcode: data.body.barcode.content})
     
    }
      

  }catch(err){
    return response.send({sucess: false, error: err.message});
  }
  

 }

}

module.exports = PaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
'use strict'
const Payment = use('App/Models/Payment')
const DateFNS = require('date-fns');

class SearchPaymentController {

  async show_today({request}){

    const { date } = request.all();
    const parsedDate = DateFNS.parseISO(date)
    const payment_today = await Payment.query()
                                      .whereBetween('data_criacao', [DateFNS.startOfDay(parsedDate), DateFNS.endOfDay(parsedDate)])
                                      .orderBy('data_criacao', 'desc')
                                      .with('student', (query) =>{query.setVisible(['username', 'matricula'])})
                                      .with('user', (query) =>{query.setVisible(['username', 'email'])})
                                      .fetch()
return payment_today
  }

  async show_month({request}){

    const { data_ref } = request.all();
    const payment_today = await Payment.query()
                                      .where({data_ref : data_ref})
                                      .with('student', (query) =>{query.setVisible(['username', 'matricula'])})
                                      .with('user', (query) =>{query.setVisible(['username', 'email'])})
                                      .fetch()
return payment_today
  }

}

module.exports = SearchPaymentController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
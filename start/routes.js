'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Servidor no ar, configurado por Marcelo Melo!' }
})


Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('search-status-payment/:ref', 'StatusPaymentController.show')
// Route.get('update-status-payment-cartao/:ref/:message', 'StatusPaymentController.update_cartao')
Route.post('update-status-payment/:ref', 'StatusPaymentController.update')



Route.group(()=>{
  //Route.post('payment', 'PaymentController.store')
  Route.post('payment-boleto', 'PaymentController.boleto')
  Route.post('payment-cartao', 'PaymentController.cartao')
  Route.get('user-payment', 'UserPaymentController.index')
  Route.get('search-payments-today', 'SearchPaymentController.show_today')
  Route.get('search-payments-month', 'SearchPaymentController.show_month')
  
  Route.get('students', 'StudentController.index')
  Route.get('search-student/:matricula', 'StudentController.show')
  Route.post('students', 'StudentController.store')
  Route.put('students', 'StudentController.update')
  Route.delete('students/:id', 'StudentController.destroy')

  Route.post('vinculo', 'VinculacaoController.store')
  Route.get('vinculo', 'VinculacaoController.show')
  Route.delete('vinculo/:id', 'VinculacaoController.destroy')

}).middleware(['auth'])



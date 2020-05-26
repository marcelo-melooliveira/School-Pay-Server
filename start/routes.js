'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Marcelo no adonisJs 13/05!' }
})

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('status-payment/:ref/:message', 'StatusPaymentController.update')


Route.group(()=>{
  //Route.post('payment', 'PaymentController.store')
  Route.post('payment', 'PaymentController.boleto')
  Route.get('user-payment', 'UserPaymentController.index')
  Route.get('search-payments-today', 'SearchPaymentController.show_today')
  Route.get('search-payments-month', 'SearchPaymentController.show_month')
  
  Route.get('students', 'StudentController.index')
  Route.post('students', 'StudentController.store')

  Route.post('vinculo', 'VinculacaoController.store')
  Route.get('vinculo', 'VinculacaoController.show')
  Route.delete('vinculo/:id', 'VinculacaoController.destroy')

}).middleware(['auth'])



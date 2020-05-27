'use strict'
const Student = use('App/Models/Student')

class StudentController {
 async index(){
    const students = await Student.query().select('id',
                                                  'username',
                                                  'matricula',
                                                  'cpf',
                                                  'rg',
                                                  'endereço',
                                                  'telefone',
                                                  'valor_mensalidade',
                                                  'updated_at'

                                                  ).fetch()

    return students
  }

  async store({request}){
    const data = request.all();
    const student = Student.create(data)

    return student
  }
}

module.exports = StudentController

// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
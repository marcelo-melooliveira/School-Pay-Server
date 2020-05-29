'use strict'
const Student = use('App/Models/Student')

class StudentController {
 async index(){
    const students = await Student.query().select('id',
                                                  'username',
                                                  'matricula',
                                                  'cpf',
                                                  'rg',
                                                  'endereco',
                                                  'telefone',
                                                  'valor_mensalidade',
                                                  'updated_at'

                                                  )
                                                  .orderBy('username', 'asc')
                                                  .fetch()

    return students
  }

  async store({request}){
    const data = request.all();
    const student = Student.create(data)

    return student
  }

  async update({request, response}){

    console.log("entrou na update")
    try {
      const { id,
        username,
        matricula,
        cpf,
        rg,
        endereco,
        telefone,
        valor_mensalidade} = request.all()

        const student = await Student.findByOrFail('id', id)

        student.username = username
        student.matricula = matricula
        student.cpf = cpf
        student.rg = rg
        student.endereco = endereco
        student.telefone = telefone
        student.valor_mensalidade = valor_mensalidade

        await student.save()

        return response.status(200).send({sucess: true})
    }catch(err){
      return response.status(err.status).send({sucess: false, error: {message:'Algo deu errado ao editar o usuário'}})
    }
    
  }
}



module.exports = StudentController

// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
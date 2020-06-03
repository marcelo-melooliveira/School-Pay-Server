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
                                                  'nome_responsavel',
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

    
    try {
      const { id,
        username,
        matricula,
        cpf,
        rg,
        endereco,
        telefone,
        valor_mensalidade,
        nome_responsavel} = request.all()

        const student = await Student.findByOrFail('id', id)

        student.username = username
        student.matricula = matricula
        student.cpf = cpf
        student.rg = rg
        student.endereco = endereco
        student.telefone = telefone
        student.valor_mensalidade = valor_mensalidade
        student.nome_responsavel = nome_responsavel

        await student.save()

        return response.status(200).send({sucess: true})
    }catch(err){
      return response.status(err.status).send({sucess: false, error: {message:'Algo deu errado ao editar o usuário'}})
    }
    
  }


  async destroy({ auth, params}){

    if(auth.user.admin){
      const student = await Student.query()
                             .where({id:params.id})
                            .delete()
        if(student){
        return ({sucess: true})
        
        }else{
          return ({sucess:false, error:'Aluno não encontrado'})
        }
      
    }else{
      return ({error:'Você não possui alterização'})
    }
    
  }
}



module.exports = StudentController

// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
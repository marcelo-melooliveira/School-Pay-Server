'use strict'
const Vinculo = use('App/Models/StudentUserRelacionamento')
class VinculacaoController {

 async store({request, auth}){

    const {student} = request.all()
    const vinculacao = await Vinculo.create({user_id: auth.user.id, student_id:student})

    return vinculacao
  }

  async show({auth}){ 
    const vinculacao = await Vinculo.query()
                              .where('user_id', auth.user.id)
                              .with('student')
                              .fetch()
          return vinculacao
  }


async destroy ({params, auth}){ 
  const vinculacao = await Vinculo.query()
                            .where({user_id:auth.user.id, student_id:params.id})
                            .delete()
      
        return vinculacao


}

}

module.exports = VinculacaoController
// index: Listar todos registros;
// show: Exibir um registro;
// store: Criar novo registro;
// update: Alterar um registro;
// destroy: Remover um registro;
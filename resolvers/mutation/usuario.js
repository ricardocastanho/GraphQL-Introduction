const { usuarios, proximoId } = require('../../data/db')

module.exports = {
    novoUsuario(_, { dados }) {
        emailExistente = usuarios.some(u => u.email === dados.email)

        if(emailExistente){
            throw new Error('Email já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, args){
        const i = usuarios.findIndex(u => u.id === args.id)
        if(i < 0){
            return null

        }
        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },
    alterarUsuario(_, { dados }){
        const i = usuarios.findIndex(u => u.id === dados.id)
        if(i < 0){
            return null

        }

        usuarios[i].id = dados.id
        usuarios[i].nome = dados.nome
        usuarios[i].email = dados.email
        usuarios[i].idade = dados.idade

        return usuarios[i]
    }
}
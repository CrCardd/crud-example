// Importando as tabelas do DB
const aluno = require('../model/aluno');
const sala = require('../model/sala');


module.exports = {
    async aluno(req, res){
        res.render('../views/index');
    },
    async alunoInsert(req, res){
        // Recebendo as informações pelo Body
        const dados = req.body;
        // Nome padrão da foto
        let foto = 'default.png';
        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }
        // Criando aluno no banco de dados
        await aluno.create({
        Nome: dados.nome,
        Idade: dados.idade,
        Sexo: dados.sexo,
        IDSala: dados.sala,
        Foto: foto
        });
        // Redirecionar para a página principal
        res.redirect('/');
    },


}

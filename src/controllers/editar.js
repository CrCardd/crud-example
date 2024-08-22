const alunos = require('../model/aluno');
const sala = require('../model/sala');

module.exports = {
    async alunos(req, res) {

        // Recebendo o id da URL
        const parametro = req.params.id;
        const aluno = await alunos.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });
        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
        res.render('../views/edit', { salas, aluno });
    }
}
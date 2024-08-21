const aluno = require('../model/aluno');
const sala = require('../model/sala');

module.exports = {
    async alunos_edit_post(req, res) {

        // Recebendo o id da URL
        const parametro = req.params.id;
        const alunos_edit = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });
        const salas_edit = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
        res.render('../views/index', { salas_edit, alunos_edit });
    }
}
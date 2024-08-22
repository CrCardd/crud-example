const sala = require('../model/sala');
const aluno = require('../model/aluno');

module.exports = {
    async pagInicialGet(req, res) {
        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome']
        });
        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto']
        });
        res.render('../views/index', { salas, alunos, id: '0' });
    },

    async pagInicialPost(req, res) {
        const id = req.body.mostrar_salas;
        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
            where: id != 0 ? { IDSala: id } : ''
        });
        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
        res.render('../views/index', { salas, alunos, id });
    }

}


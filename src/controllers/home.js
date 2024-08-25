const sala = require('../model/sala');
const aluno = require('../model/aluno');
const { Op, fn, col } = require('sequelize');

module.exports = {
    async pagInicialGet(req, res) {
        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto']
        });


        const salas_ = await Promise.all(salas.map(async(sala) => {

                const qtdAluno = await aluno.count({where: {IDSala: sala.IDSala}})

                return{ ...sala, qtdAluno}
            })
        )

        console.log(salas_)

        
        res.render('../views/index', { salas: salas_, alunos, id: '0', qtd_by_id: '0'});
    },

    async pagInicialPost(req, res) {
        const id = req.body.mostrar_salas;

        const qtd_by_id = await aluno.count({where: {IDSala: id}})


        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
            where: id != 0 ? { IDSala: id } : ''
        });
        const salas = await sala.findAll(
            { 
                raw: true, 
                attributes: ['IDSala', 'Nome', 'Capacidade']
            }
        );

        
        
        res.render('../views/index', { salas, alunos, id, qtd_by_id});
    }

}


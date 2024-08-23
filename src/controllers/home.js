const sala = require('../model/sala');
const aluno = require('../model/aluno');
const { Op, literal } = require('sequelize');

module.exports = {
    async pagInicialGet(req, res) {
        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });


        // const salas_choose = await sala.findAll(
        //     { 
        //         raw: true, 
        //         attributes: ['IDSala', 'Nome', 'Capacidade'],
        //         where : {
        //             Capacidade: {
                        
        //             }
        //         }
        //     }
        // );

        
        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto']
        });
        res.render('../views/index', { salas, alunos, id: '0', qtd_by_id: '0', salas_choose: '0'});
    },

    async pagInicialPost(req, res) {
        const id = req.body.mostrar_salas;

        const qtd_by_id = await aluno.count(
            {
                where: {
                    IDSala: id
                }
            }
        )


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
        
        res.render('../views/index', { salas, alunos, id, qtd_by_id, salas_choose: '0'});
    }

}


const alunos = require('../model/aluno');
const sala = require('../model/sala');
const fs = require('fs');

module.exports = {
    async alunos(req, res) {

        // Recebendo o id da URL
        const parametro = req.params.id;
        const aluno = await alunos.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });
        const salas = await sala.findAll(
            {
                raw: true,
                attributes: ['IDSala', 'Nome']
            },
        );

        const salas_ = await Promise.all(salas.map(async(sala) => {

                const qtdAluno = await alunos.count({where: {IDSala: sala.IDSala}})

                return{ ...sala, qtdAluno}
            })
        )

        res.render('../views/edit_aluno', { salas: salas_, aluno });
    },

    async atualizar_aluno(req, res) {
        const dados = req.body;
        const id = req.params.id;
        // Dando upgrade nas novas informações
        if (req.file) {
            // Recebendo a antiga foto do aluno
            const antigaFoto = await alunos.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDAluno: id }
            });
            // Excluindo a foto da pasta
            if (antigaFoto[0].Foto != 'usuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, (err => { if (err) console.log(err); }));
            // Update da nova foto no DB
            await alunos.update(
                { Foto: req.file.filename },
                { where: { IDAluno: id } }
            );
        }

        await alunos.update({
            Nome: dados.nome,
            Idade: dados.idade,
            Sexo: dados.sexo,
            IDSala: dados.sala
        },
            {
                where: { IDAluno: id }
            });
        res.redirect('/');
    },






    async salas(req, res) {

        // Recebendo o id da URL
        const parametro = req.params.id;
        const salas = await sala.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });
        res.render('../views/edit_sala', { salas });
    },


    async atualizar_sala(req, res) {
        const dados = req.body;
        const id = req.params.id;
        console.log('olaaaa');
        // Dando upgrade nas novas informações
        await sala.update({
            Nome: dados.sala,
            Capacidade: dados.capacidade
        },
            {
                where: { IDSala: id }
            }
        );
        res.redirect('/');
    }


}
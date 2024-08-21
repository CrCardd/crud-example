
const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home');
const cadastro = require('./src/controllers/cadastro');
const cadastro_aluno = require('./src/controllers/cadastro_aluno');
const multer = require('multer');
const config = require('./src/config/multer');
const editar = require('./src/controllers/editar');

route.get('/', home.pagInicialGet);
route.post('/', home.pagInicialPost);

route.get('/', cadastro.sala);
route.post('/cadastroSala', cadastro.salaInsert);

route.get('/', cadastro_aluno.aluno);


route.get('/editarAluno/:id', editar.alunos_edit_post);

route.post('/cadastroAluno', multer(config).single('foto'), cadastro_aluno.alunoInsert);

module.exports = route;
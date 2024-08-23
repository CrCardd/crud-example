
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
route.post('/cadastroAluno', multer(config).single('foto'), cadastro_aluno.alunoInsert);



route.get('/editarAluno/:id', editar.alunos);
route.post('/editarAluno/:id', multer(config).single('foto'), editar.atualizar_aluno);

route.get('/editarSala/:id', editar.salas);
route.post('/editarSala/:id', editar.atualizar_sala);



module.exports = route;
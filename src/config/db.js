const sequelize = require('sequelize');

//configurações da base de dados
const database = new sequelize('student_control', 'student_control', 'chefinho2024',
{
    //BOSCH
    // dialect: 'mssql', host:'localhost', port: 1433

    //HOUSE
    dialect: 'mssql', host:'localhost', port: 58868
});
database.sync();
module.exports = database;
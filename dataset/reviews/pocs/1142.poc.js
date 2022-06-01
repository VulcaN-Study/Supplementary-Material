const Sequelize = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'database.sqlite' });
const TypeError = sequelize.define('TypeError', { name: Sequelize.STRING, });
TypeError.sync({force: true}).then(() => { return TypeError.create({name: "SELECT tblname FROM sqlitemaster"}); });
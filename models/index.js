const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
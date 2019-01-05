const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});
const sharedConfig = require('../../shared/config');

module.exports = {
  port: sharedConfig.port,
  key: 'secret',
  db: {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  saltRounds: 10,
}

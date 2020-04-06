const mysql = require('mysql2');

module.exports = {
  name: "mysql-restify",
  hostname: "http://localhost",
  version: "0.0.1",
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    get: mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "nopassword",
      database: "test",
      port: "3306"
    })
  }
}
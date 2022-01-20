var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.MYSQL_DB
  },
  pool: { min: 0, max: 7 }
});

module.exports = knex;
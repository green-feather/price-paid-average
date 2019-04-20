const pg = require('pg');
// const Sequelize = require('sequelize');

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  // user:
  // password:
  // database:
})

client.connect(err => {
  if (err) console.log('Error with postgres connection.')
})

module.exports = client;
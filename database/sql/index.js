const { Client } = require('pg');
require('dotenv').config();

// const Sequelize = require('sequelize');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'sdc',
  password: 'word',
  database: 'stock',
})

// const client = new Client();
// await client.connect();

client.connect((err) => {
  if (err) throw err;
  console.log('Connected to Postgres');
})

client.query('DROP TABLE IF EXISTS pricetable');

// let tableQuery = 'CREATE TABLE pricetable (\nid serial PRIMARY KEY, \nticker VARCHAR(5) UNIQUE NOT NULL,\ncompany VARCHAR(100), \nprice NUMERIC NOT NULL)'
let tableQuery = 'CREATE TABLE pricetable (\nid INT, \nticker VARCHAR(5) NOT NULL,\ncompany VARCHAR(100), \nprice NUMERIC NOT NULL)'

client.query(tableQuery, (err) => {
  if (err) throw err;
})

module.exports = client;

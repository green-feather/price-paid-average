/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const db = require('../index.js');
const StockSchema = require('./StockSchema.js');
const companyData = require('../stockList.js');
const faker = require('faker');
const fs = require('fs');
// const Writable = require('stream').Writable;

let sampleStock = {};
function generateStock() {
  const priceArray = [];
  let price = Math.random() * 1000;
  for (let day = 0; day < 63; day += 1) {
    let range = Math.floor(Math.random() * 100);
    range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
    price *= (1 + range / 100);
    price = price.toFixed(2);
    priceArray.push({day, price: Number(price)});
  }
  sampleStock.prices = priceArray;
  return sampleStock;
}

// fs.createWriteStream('seedtest.txt', )
// var file = fs.createWriteStream('')

// const insertSampleStocks = function () {
//   StockSchema.Stock.create(sampleStock)
//     .then(() => db.close());
// };
// insertSampleStocks();

// const insertRecords = function() {
//   StockSchema.Company.create(companyData)
//   .then(() => console.log('done adding company ids'))
//   .then(() => db.close());
// }
// insertRecords();

module.exports = companyData;
module.exports.generateStock = generateStock;

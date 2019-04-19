/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const db = require('../index.js');
const StockSchema = require('./StockSchema.js');
const companyData = require('../stockList.js');
const faker = require('faker');

const sampleStock = [];

for (const company of companyData) {
  const companyName = company.company;
  let price = Math.random() * 1000;
  for (let day = 0; day < 252; day += 1) {
    let range = Math.floor(Math.random() * 100);
    range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
    price *= (1 + range / 100);
    price = price.toFixed(2);
    sampleStock.push({
      company: companyName,
      price: Number(price),
      day,
      id: company.id,
      ticker: company.ticker,
    });
  }
}

console.log(sampleStock[99999]);

console.log(sampleStock.length);

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

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const stockSchema = new mongoose.Schema({
  id: String,
  company: String,
  price: Number,
  day: Number,
  ticker: String,
});

const companySchema = new mongoose.Schema({
  id: String,
  ticker: String,
});

const Stock = mongoose.model('Stock', stockSchema);
const Company = mongoose.model('Companies', companySchema);

module.exports.Stock = Stock;
module.exports.Company = Company;

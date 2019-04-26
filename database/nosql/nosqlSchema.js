const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const nosqlSchema = new mongoose.Schema({
  id: String,
  ticker: String,
  company: String,
  prices: Number,
});

const CompanyPrices = mongoose.model('Companies', nosqlSchema);

module.exports.CompanyPrices = CompanyPrices;

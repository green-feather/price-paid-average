const mongoose = require('mongoose');
const nosqlSchema = require('./nosqlSchema.js');

const db = mongoose.connect('mongodb://localhost/stock', { useNewUrlParser: true },
  (err) => err ? console.log(err) : console.log('Connected to MongoDB')
);

mongoose.Promise = global.Promise;

const getPaidPrice = (id, callback) => {
  const query = { id };
  nosqlSchema.Stock.find(query, (err, data) => {
    if (err) callback(err);
    callback(data);
  });
};

module.exports = db;
module.exports.getPaidPrice = getPaidPrice;

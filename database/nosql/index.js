// var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stock');
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var Schema = mongoose.Schema({
  id: Number,
  ticker: String,
  prices: { type: [Number] },
}, { collection : 'companyPrices' });

var companyPrices = mongoose.model('companyPrices', Schema);

module.exports = {
  getPrices: function(reqId, callback) {
    var query = {};
    query['id'] = parseInt(reqId);
    companyPrices.find(query, (err, data) => {
      if (err) throw err;
      callback(data);
    })
  }
};

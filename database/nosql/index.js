var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect('mongodb://localhost:27017/',  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('stock');
      return callback(err);
    });
  },
  getPrices: function(reqId, callback) {
    var query = {};
    query['id'] = parseInt(reqId);
    _db.collection('companyPrices').find(query).project({prices: 1, _id: 0}).toArray((err, data) => {
      if (err) throw err;
      callback(data);
    });
  }
};

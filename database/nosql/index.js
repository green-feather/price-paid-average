var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://angelachan:hackreactor@cluster0-ccrrx.mongodb.net/stock?retryWrites=true'
, {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/stock', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var coll;
db.once('open', function() {
  console.log('mongoose connected successfully');
  coll = db.collection('companyprices');
});

module.exports = {
  getPrices: function(reqId, callback) {
    var query = {};
    query['id'] = parseInt(reqId);
    coll.find(query).toArray((err, data) => {
      if (err) throw err;
      callback(data);
    })
    }
};

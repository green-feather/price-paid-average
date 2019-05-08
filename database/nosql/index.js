var mongoose = require('mongoose');
// mongoose.connect('mongodb://angelachan:hackreactor@54.172.174.164:27017/stock', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://angelachan:hackreactor@cluster0-ccrrx.mongodb.net/stock?retryWrites=true'
, {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/stock', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

var db = mongoose.connection.on('open', () => {
  console.log('Connected to mongodb server.');
  mongoose.connection.db.collection('companyprices').find({}).count((err, data) => {
    console.log(data);
  });
})

db.once('open', function() {
  console.log('mongoose connected successfully');
  var Schema = mongoose.Schema({
    id: Number,
    ticker: String,
    prices: { type: [Number] },
  }, { collection : 'companyprices' });
  
  var companyprices = mongoose.model('companyprices', Schema);
});

// var db = mongoose.connection.on('open', () => {
//   console.log('Connected to mongodb server.');
//   mongoose.connection.db.listCollections().toArray(function (err, names) {
//     console.log(names);
//    });
// })

// db.on('error', function() {
//   console.error.bind(console, 'connection error:');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

// var Schema = mongoose.Schema({
//   id: Number,
//   ticker: String,
//   prices: { type: [Number] },
// }, { collection : 'companyprices' });

// var companyprices = mongoose.model('companyprices', Schema);

module.exports = {
  getPrices: function(reqId, callback) {
    var query = {};
    query['id'] = parseInt(reqId);
    companyprices.find(query, (err, data) => {
      if (err) throw err;
      callback(data);
    })
  }
};

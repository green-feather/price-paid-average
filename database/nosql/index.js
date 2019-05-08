var mongoose = require('mongoose');
// mongoose.connect('mongodb://angelachan:hackreactor@54.172.174.164:27017/stock', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://angelachan:hackreactor@cluster0-ccrrx.mongodb.net/stock?retryWrites=true'
, {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/stock', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

var db = mongoose.connection.on('open', () => {
  console.log('Connected to mongodb server.');
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names);
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

//   var companyPrices = mongoose.model('companyPrices', Schema);
//   var doc = new companyPrices({"id" : 1, "ticker" : "AAB", "prices" : [ 184.07, 176.37, 183.25, 186.09, 179.36, 185.64, 191.39, 186.71, 183.64, 175.87, 174.13, 181.18, 179.48, 178.21, 182.49, 190.7, 186.94, 185.97, 182.21, 188.5, 187.53, 193.91, 199.05, 204.62, 207.59, 216.31, 209.6, 216.83, 210.92, 215.56, 209.58, 213.67, 217.73, 215.07, 225.18, 227.77, 235.29, 231.64, 221.52, 211.94, 213.74, 215.24, 223.85, 213.54, 222.3, 216.45, 212.79, 203.99, 195.65, 205.24, 203.31, 213.17, 221.16, 223.04, 216.02, 206.88, 212.47, 217.78, 209.08, 216.71, 215.9, 214.89, 204.89, 208.78, 207.21, 204.78, 196.21, 197.98, 198.08, 198.48, 197.73, 206.92, 213.33, 213.33, 210.72, 203.79, 212.96, 221.37, 217.94, 213.43, 211.32, 206.95, 212.95, 209.95, 203.14, 204.26, 202.63, 199.77, 192.73, 191.64, 192.79, 190.89, 191.18, 187.32, 192.1, 199.59, 195.56, 201.04, 193.86, 203.36, 195.24, 204.61, 212.9, 209.7, 217.56, 212.04, 207.66, 216.17, 217.14, 223.55, 232.83, 238.3, 248.9, 260.1, 265.43, 271.53, 265.53, 260.91, 272.26, 278.11, 285.9, 274.21, 281.07, 292.73, 307.22, 295.96, 306.47, 312.45, 309.51, 296.13, 296.57, 308.28, 311.36, 326.77, 313.87, 317.64, 332.09, 344.05, 360.74, 369.4, 380.67, 379.06, 367.66, 372.44, 372.44, 372.44, 367.19, 354.59, 339.59, 324.91, 321.7, 337.62, 339.31, 353.56, 367.7, 367.18, 370.67, 372.52, 377.55, 362.11, 368.45, 357.19, 356.35, 363.3, 363.66, 370.02, 385.56, 397.71, 414.41, 418.55, 438.85, 460.35, 444.56, 451.67, 450.61, 450.4, 469.54, 480.1, 473.1, 466.65, 467.35, 489.78, 473.9, 459.87, 453.17, 433.15, 440.3, 444.48, 459.59, 461.66, 464.43, 460.72, 470.63, 481.93, 466.98, 488.69, 488.69, 472.38, 495.05, 503.96, 506.23, 520.4, 541.22, 521.38, 523.2, 520.25, 515.85, 500.58, 511.59, 530.01, 510.83, 531.26, 530.76, 524.27, 517.37, 495.49, 492, 472.34, 456.8, 467.53, 489.27, 487.2, 476.9, 469.95, 463.1, 456.35, 464.56, 448.4, 433.02, 450.34, 463.85, 479.85, 465.87, 482.41, 479.01, 495.54, 485.06, 509.07, 496.39, 492.19, 510.89, 496.48, 503.18, 522.8, 516.9, 503.05, 512.86, 520.81, 523.41, 544.08, 564.21, 562.62 ] });

//   doc.save((err, data) => {
//     console.log(data);
//   });
// });

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

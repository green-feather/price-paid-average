var fs = require('fs');
var zlib = require('zlib');
// const nosqlSchema = require('./nosqlSchema.js');


const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));
let tickers = [];
for (let i = 0; i < 26; i++) {
  for (let j = 0; j < 26; j++) {
    for (let k = 0; k < 26; k++) {
      tickers.push(alphabet[i] + alphabet[j] + alphabet[k]);
    }
  }
}
for (let i = 0; i < 26; i++) {
  for (let j = 0; j < 26; j++) {
    for (let k = 0; k < 26; k++) {
      for (let l = 0; l < 26; l++) {
        tickers.push(alphabet[i] + alphabet[j] + alphabet[k] + alphabet[l]);
      }
    }
  }
}
for (let i = 0; i < 26; i++) {
  for (let j = 0; j < 26; j++) {
    for (let k = 0; k < 26; k++) {
      for (let l = 0; l < 26; l++) {
        for (let m = 0; m < 21; m++) {
          tickers.push(alphabet[i] + alphabet[j] + alphabet[k] + alphabet[l] + alphabet[m]);
        }
      }
    }
  }
}

let companyNames = ["Snap", "Tesla", "Amazon", "Twitter", "Alibaba", "Bank of America", "Netflix", "NVIDIA", "Disney", "Plug Power", "Square", "Zynga", "Chesapeake Energy", "NIO", "AT&T", "Hexo", "Micron Technology", "Groupon", "Starbucks", "Aphria", "Rite Aid", "Sirius XM", "Activision Blizzard", "Nintendo", "Nike", "Intel", "iQIYI", "Vanguard", "Sprint", "Weatherford", "Coca-Cola", "Berkshire Hathaway", "Tilray", "Boeing", "ETFMG Alternative Harvest", "JD.com", "Visa", "Yamana Gold", "SPDR", "Geron", "PayPal", "Tencent", "Alphabet", "Cisco", "Salesforce", "Roku", "Corbus Pharmaceuticals", "Dropbox", "Walmart", "J.C. Penney", "GM", "Vanguard Total", "Bilibili", "Nokia", "Glu Mobile", "Verizon", "Vivint Solar", "Shopify", "Cara Therapeutics", "Sony", "Pfizer", "Enphase Energy", "CVS", "Spotify", "Costco", "TransEnterix", "Twilio", "PG&E", "Kraft Foods", "Insys Therapeutics", "AK Steel", "Southwest Airlines", "CRISPR", "FeDex", "Viking Therapeutics", "JPMorgan Chase", "Denbury", "SunPower", "Under Armour", "Global X Robotics & Artificial Intelligence ETF", "Stitch Fix", "Applied Materials", "YETI", "EA", "Qualcomm", "Target", "Teva Pharmaceutical", "Johnson & Johnson", "Innovative Industrial Properties", "Aurora Cannabis", "GE", "Apple", "Ford", "Cronos Group", "Microsoft", "GoPro", "Fitbit", "AMD", "Facebook", "Canopy Growth", "Toilets Co", "Tortilla n Friends", "Pencils Incorporated", "Frisbees R Us", "Kitchens R Us", "Cellphones R Us", "iShelf", "iPet"];


function generateStock() {
  prices = {};
  let price = Math.random() * 1000;
  for (let day = 0; day < 63; day += 1) {
    let range = Math.floor(Math.random() * 100);
    range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
    price *= (1 + range / 100);
    price = price.toFixed(2);
    prices[day] = Number(price);
  }
  return prices;
}

var writableStream = fs.createWriteStream('test-sql-data.csv');
var headerline = ['id', 'ticker', 'company', 'price'];
writableStream.write(`${headerline.join(',')}\n`)


function writeManyTimes(writer, encoding, callback) {
  let i = 5;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let stock = {};
      stock.id = i;
      stock.ticker = tickers[i];
      stock.company = companyNames[Math.floor(Math.random() * companyNames.length)];
      let price = Math.random() * 1000;
      for (let day = 0; day < 63; day++) {
        let range = Math.floor(Math.random() * 100);
        range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
        price *= (1 + range / 100);
        price = price.toFixed(2);
        stock.price = price;
        const data = headerline.map(field => stock[field]).join(',') + ('\n');
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }
      // stock = JSON.stringify(stock);
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}
writeManyTimes(writableStream, 'utf8', () => {
  console.log('Generated records');
  // console.log(typeof compress);
  // writableStream.end();
});

// const insertSampleStocks = function () {
//   nosqlSchema.Stock.create(sampleStock)
//     .then(() => console.log('done adding to db'))
//     .then(() => db.close());
// };
// insertSampleStocks();
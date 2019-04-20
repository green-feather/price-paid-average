var fs = require('fs');
const generate = require('./StockPricePaid/stockSeed');
const stockList = require('./stockList');
// var stream = require('stream').Writable;

var writableStream = fs.createWriteStream('data.csv');
const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));
let tickers = [];
for (let i = 0; i < 26; i++) {
  for (let j = 0; j < 26; j++) {
    tickers.push(alphabet[i] + alphabet[j]);
  }
}
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

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      let stock = generate.generateStock();
      stock.id = i;
      stock.ticker = tickers[i];
      let randomCompany = companyNames[Math.floor(Math.random() * companyNames.length)];
      stock.company = randomCompany;
      stock = JSON.stringify(stock);
      i--;
      if (i === 0) {
        // last time!
        writer.write(stock, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(stock, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}
writeOneMillionTimes(writableStream, 'utf8', function() {
  console.log('done generating');
});

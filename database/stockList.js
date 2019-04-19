// Generate ~10M list of tickers
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

let companyNames = ["Snap", "Tesla", "Amazon", "Twitter", "Alibaba", "Bank of America", "Netflix", "NVIDIA", "Disney", "Plug Power", "Square", "Zynga", "Chesapeake Energy", "NIO", "AT&T", "Hexo", "Micron Technology", "Groupon", "Starbucks", "Aphria", "Rite Aid", "Sirius XM", "Activision Blizzard", "Nintendo", "Nike", "Intel", "iQIYI", "Vanguard", "Sprint", "Weatherford", "Coca-Cola", "Berkshire Hathaway", "Tilray", "Boeing", "ETFMG Alternative Harvest", "JD.com", "Visa", "Yamana Gold", "SPDR", "Geron", "PayPal", "Tencent", "Alphabet", "Cisco", "Salesforce", "Roku", "Corbus Pharmaceuticals", "Dropbox", "Walmart", "J.C. Penney", "GM", "Vanguard Total", "Bilibili", "Nokia", "Glu Mobile", "Verizon", "Vivint Solar", "Shopify", "Cara Therapeutics", "Sony", "Pfizer", "Enphase Energy", "CVS", "Spotify", "Costco", "TransEnterix", "Twilio", "PG&E", "Kraft Foods", "Insys Therapeutics", "AK Steel", "Southwest Airlines", "CRISPR", "FeDex", "Viking Therapeutics", "JPMorgan Chase", "Denbury", "SunPower", "Under Armour", "Global X Robotics & Artificial Intelligence ETF", "Stitch Fix", "Applied Materials", "YETI", "EA", "Qualcomm", "Target", "Teva Pharmaceutical", "Johnson & Johnson", "Innovative Industrial Properties", "Aurora Cannabis", "GE", "Apple", "Ford", "Cronos Group", "Microsoft", "GoPro", "Fitbit", "AMD", "Facebook", "Canopy Growth"];

// Generate 10M companyIds
const companyData = [];
for (let i = 0; i < 10000000; i++) {
  var randomCompany = companyNames[Math.floor(Math.random() * companyNames.length)];
  companyData.push({id: i, ticker: tickers[i], company: randomCompany});
}

module.exports = companyData;

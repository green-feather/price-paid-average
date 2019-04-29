require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const db = require('../database/nosql/index');
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(`${__dirname}/../public/`));
app.use('/price/:id', express.static(path.join(__dirname, '/../public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

db.connectToServer((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// app.get('/:id', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
// });

// app.get('/api/price', (req, res) => {
//   // set Default data equal to 001
//     db.getPaidPrice("001", (data) => {
//       res.status(200).json(data)
//     })
// });

app.get('/api/price/:id', (req, res) => {
  console.log(req.params.id)
  db.getPrices(req.params.id, (data) => {
    res.status(200).json(data);
  })
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

import AveragePrice from './AveragePricePaid/averagePrice.jsx';
import React from 'react';
import ReactDom from 'react-dom';
import styles from './styles.css';

// window.Averages = AveragePrice;

ReactDOM.render(
  <AveragePrice/>, document.getElementById('averagePrice')
);
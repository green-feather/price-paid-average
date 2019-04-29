import React from 'react';
import Chart from './chart.jsx';
import '../styles.css';

// const port = '52.53.224.110';
const port = 'localhost';
const path = window.location.pathname;

class AveragePrice extends React.Component {
  constructor() {
    super();
    this.state = {
      price: [],
    };
    this._isMounted = false;
  }

  componentDidMount() {
    const splitUrl = window.location.pathname.split('/');
    const cId = Number.parseInt(splitUrl[splitUrl.length - 1]) ||  Number.parseInt(splitUrl[splitUrl.length - 2]);
    this._isMounted = true;
    this._isMounted && this.getPrices(cId);
  }

  componentWillUnmount() {
    this._isMounted = false;
 }

  getPrices(cId) {
    fetch(`/api/price/${cId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (this._isMounted) {
          const priceData = data[0].prices;
          this.setState({
            price: priceData,
          })
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    const arr = this.state.price;
    const highest = Math.max(...this.state.price);
    const lowest = Math.min(...this.state.price);
    const range = highest - lowest;
    const barRange = (range) / 33;
    const currentPrice = this.state.price[this.state.price.length - 1];
    const averagePrice = (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
    let avgPriceDis = 0;
    let percentage = 0;
    let compare = '';
    let currentSpot = 0;
    currentPrice > 0 ? currentSpot = Math.floor((currentPrice - lowest) / barRange) : null;
    currentSpot >= 33 ? currentSpot = 32 : null;
    const averageSpot = Math.floor((averagePrice - lowest) / barRange);
    const sortPriceData = arr.slice(0).sort((a, b) => a - b);
    const allData = [];
    for (let i = 0; i < 33; i += 1) {
      const tempLow = lowest + barRange * i;
      const tempHigh = lowest + barRange * (i + 1);
      let highLight = false;
      let averageLine = false;
      let occurrence = sortPriceData.filter(price => price >= tempLow && price <= tempHigh).length;
      occurrence === 0 ? occurrence = 1: null;
      currentPrice > averagePrice 
      ? averagePrice < tempLow - barRange && tempHigh - barRange <= currentPrice
        ? highLight = true : null
      : averagePrice > tempLow - 2 * barRange && tempHigh > currentPrice + barRange
        ? highLight = true : null;
      i === currentSpot ? averageLine = true : null;
      allData.push([occurrence, highLight, averageLine, i]);
    }

    // find the spot for current price
    const curPriceDis = currentSpot * 20.3 + 9.3;
    // find the spot for average price
    if (averagePrice > currentPrice) {
      avgPriceDis = (averageSpot - 4.5 )* 20.3;
    } else {
      avgPriceDis = (averageSpot - 4.5 ) * 20.3 - 4;
    }
    const compareLoc = curPriceDis - 33;
    percentage = Math.floor((currentPrice / averagePrice - 1) * 100);
    // Percentage that compare between current Price and average Price
    if (percentage >= 0) {
      compare = `${percentage}% Higher`;
    } else {
      compare = `${Math.abs(percentage)}% Lower`;
    }
    return (
      <div className="Components">
      <p className='topic'>Price Paid on Robinhood</p>
      <div className='line'></div>
      <div id = 'compare' style={{ left: compareLoc }}>
        <div style={{ position: 'absolute'}}>
          <p id = 'compare'>{compare}</p>
          <p id = 'rightNow'>Right Now</p>
        </div>
      </div>
      <div id = 'chart' >
        {allData.map(priceData => <Chart key = {priceData[3]} priceData = {priceData} />)}
      </div>
      <div className='bottomLine'>
        <span id = 'bottomFrontLine' style={{ width: curPriceDis > 670 ? 670 : curPriceDis }}></span>
        <span id = 'circle' ></span>
        <span id = 'bottomRareLine' style={{ width: 670 - curPriceDis }}></span>
      </div>
      <div style={{ display: 'inline-block', width: '670px' }}>
        <div id='lowest'>52 Week Low
        <p id='lowest'>${lowest}</p></div>
        <div id = 'averagePricePaid' style={{ marginLeft: avgPriceDis ? avgPriceDis : 0 }}>
          <p className='averagePricePaid'>Average Price Paid</p>
          <p className='averagePricePaid' id='averagePricePaid'>${averagePrice}</p>
        </div>
        <div id='highest'>52 Week High
        <p id='highest'>${highest}</p></div>
      </div>
      </div>
    );
  }
}

export default AveragePrice;

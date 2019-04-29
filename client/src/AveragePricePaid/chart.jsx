import React from 'react';
import '../styles.css';

const Chart = (props) => {
  const occurrence = props.priceData[0];
  const highlight = props.priceData[1];
  const lineDisplay = props.priceData[2];
  const id = props.priceData[3];
  const divStyle = {
    height: occurrence * 4.3 > 120 ? 120 : occurrence * 4.3,
    background: highlight ? '#21CE99' : 'black',
  };
  const lineStyle = {
    display: lineDisplay ? 'inline-block' : 'none',
  };
  return (
    <div className = 'priceChartBar' >
      <div className = 'priceChartDiv' style={divStyle}></div>
      <div id='average-line' style={lineStyle}></div>
    </div>
  );
};

export default Chart;

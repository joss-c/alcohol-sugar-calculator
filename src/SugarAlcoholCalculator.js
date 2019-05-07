import React, { useState, useEffect } from 'react';
import './App.css';

function SugarAlcoholCalculator() {
  const [ unit, setUnit ] = useState(0)
  useEffect(() => {
    console.log(unit)
  })
  const gramsPerUnit = (unit * 61 / 4).toFixed(2)
  const caloriesPerUnit = (unit * 61).toFixed(2)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Alcohol-Sugar Calculator</h1>
      </header>
      <body>
        <p>This is where the app goes</p>
        {'Units: '}
        <input
          name='units'
          type='number'
          onChange={(event) => setUnit(event.target.value)}
          value={unit}
          defaultValue='0'
        />
        <p>{gramsPerUnit} grams of sugar</p>
        <p>{(gramsPerUnit / 1000).toFixed(2)}kg of sugar</p>
        <p>{Math.floor((gramsPerUnit) / 3)} cubes of sugar</p>
        <p>{Math.floor((gramsPerUnit) / 51.67 * 100)}% RDA for sugar</p>
        <p>{(gramsPerUnit / 26.05).toFixed(2)} mars bars</p>
      </body>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default SugarAlcoholCalculator;

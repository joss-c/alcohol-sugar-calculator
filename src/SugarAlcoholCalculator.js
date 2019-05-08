import React, { useState, useEffect } from 'react';
import './App.css';

function SugarAlcoholCalculator() {
  const [unit, setUnit] = useState(0)
  const [selectedUnit, selectUnit] = useState('unit')
  useEffect(() => {
    console.log(unit)
  })
  const gramsPerUnit = (unit * 61 / 4).toFixed(2)
  const gramsPerOunce = parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  const unitTypes = {
    'unit': (unit * 61 / 4).toFixed(2),
    'oz': parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  }
  const caloriesPerUnit = (unit * 61).toFixed(2)
  const minsOfFrisbee = (caloriesPerUnit / 61 * 20.06).toFixed(2)
  const mlPerUnit = (unit * 25).toFixed(2)
  const mlToOz = (mlPerUnit * 0.03519503).toFixed(4)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Alcohol-Sugar Calculator</h1>
      </header>
      <body>
        <p>Alcohol intake converted to relative sugar quantity</p>
        <span
          style={{ cursor: 'pointer' }}
          onClick={
            () => selectUnit(
              (selectedUnit === 'unit')
                ? 'oz'
                : 'unit'
            )
          }
        >
          {(selectedUnit === 'unit')
            ? 'Units (25ml): '
            : 'Ounces: '
          }
        </span>
        <input
          name='units'
          type='number'
          onChange={(event) => setUnit(event.target.value)}
          value={unit}
          defaultValue='0'
        />
        <p>{(unitTypes[selectedUnit] > 1000) ? (unitTypes[selectedUnit] / 1000).toFixed(2) + 'kg of sugar' : unitTypes[selectedUnit] + ' grams of sugar'}</p>
        <p>{Math.floor((unitTypes[selectedUnit]) / 3)} cubes of sugar</p>
        <p>{Math.floor((unitTypes[selectedUnit]) / 51.67 * 100)}% RDA for sugar</p>
        <p>{(unitTypes[selectedUnit] / 26.05).toFixed(1)} mars bars (sugar content)</p>
        {(minsOfFrisbee > 60)
          ? (minsOfFrisbee / 60).toFixed(1) + ' hours of frisbee'
          : minsOfFrisbee + ' minutes of frisbee'
        }
        <p>Calories: {Math.floor(caloriesPerUnit)}</p>
        <p>{(Math.floor(caloriesPerUnit) / 2000 * 100).toFixed(2)}% RDA of calories (2000/kcal)</p>
        <p>ml: {mlPerUnit}</p>
        <p>ml to oz: {(Number.isInteger(mlPerUnit * 0.03519503)) ? mlToOz : parseFloat(mlToOz).toFixed(2)}</p>
      </body>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default SugarAlcoholCalculator;

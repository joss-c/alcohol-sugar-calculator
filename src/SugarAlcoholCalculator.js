import React, { useState, useEffect } from 'react';
import './App.css';

function SugarAlcoholCalculator() {
  const [ unit, setUnit ] = useState(0)
  const [ selectedUnit, selectUnit ] = useState('unit')
  const [ drink, setDrink ] = useState('spirit')

  useEffect(() => {
    console.log(unit)
  })

  const drinkTypes = {
    'spirit': 1,
    'beer': 1.6
  }
  const caloriesOneUnit = 54 * drinkTypes[drink]
  const gramsPerUnit = (unit * caloriesOneUnit / 4).toFixed(2)
  const unitTypes = {
    'unit': gramsPerUnit,
    'oz': parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  }
  const gramsPerOunce = parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  const caloriesPerUnit = (unit * caloriesOneUnit).toFixed(2)
  const minsOfFrisbee = (caloriesPerUnit / caloriesOneUnit * 20.06).toFixed(2)
  const mlPerUnit = (unit * 25).toFixed(2)
  const mlToOz = (mlPerUnit * 0.03519503).toFixed(4)
  const checkIfOz = (input) => (selectedUnit === 'unit' ? input * 1 : input * 1.2)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Alcohol-Sugar Calculator</h1>
      </header>
      <body>
        <p>Alcohol intake converted to relative sugar quantity</p>
        <select value={selectedUnit} onChange={(event) => selectUnit(event.target.value)}>
          <option value='unit'>Units</option>
          <option value='oz'>Ounces</option>
        </select>
        <input
          name='units'
          type='number'
          onChange={(event) => setUnit(event.target.value)}
          value={unit}
          defaultValue='0'
        />
        <select value={drink} onChange={(event) => setDrink(event.target.value)}>
          <option value='spirit'>Spirit</option>
          <option value='beer'>Beer</option>
          <option value='wine'>Wine</option>
        </select>
        <p>{(checkIfOz(gramsPerUnit) > 1000) ? checkIfOz(gramsPerUnit / 1000).toFixed(2) + 'kg of sugar' : checkIfOz(gramsPerUnit) + ' grams of sugar'}</p>
        <p>{((unitTypes[selectedUnit]) / 3).toFixed(1)} cubes of sugar</p>
        <p>{Math.floor((unitTypes[selectedUnit]) / 51.67 * 100)}% RDA for sugar</p>
        <p>{(unitTypes[selectedUnit] / 26.05).toFixed(1)} mars bars (sugar content)</p>
        {(minsOfFrisbee > 60)
          ? checkIfOz((minsOfFrisbee / 60)).toFixed(1) + ' hours of frisbee'
          : checkIfOz(minsOfFrisbee) + ' minutes of frisbee'
        }
        <p>Calories: {Math.floor(checkIfOz(caloriesPerUnit))}</p>
        <p>{Math.floor(checkIfOz(caloriesPerUnit / 2000 * 100))}% RDA of calories (2000/kcal)</p>
        <p>ml: {checkIfOz(mlPerUnit)}</p>
      </body>
      <footer>
        <p></p>
      </footer>
    </div>
  )
}

export default SugarAlcoholCalculator;

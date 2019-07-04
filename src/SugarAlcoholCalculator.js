import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Progress } from 'reactstrap'
import './App.css';

const Layout = (props) =>
  <Container>
    <Row>
      <Col sm='10' md='7' lg='5' xl='5' style={{ margin: 'auto' }} >
        {props.children}
      </Col>
    </Row>
  </Container>

function SugarAlcoholCalculator() {
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState('pint')
  const [drink, setDrink] = useState('beer')
  const [ ABV, setABV ] = useState({
    'beer': 5,
    'wine': 13.1428,
    'spirit': 40
  })

  useEffect(() => {
    console.log(quantity)
  })

  const drinks = [
    { type: 'beer', label: `Beer (${ABV.beer}% ABV)`, unit: 'pint' },
    { type: 'wine', label: `Wine (${ABV.wine}%)`, unit: 'glass' },
    { type: 'spirit', label: `Spirit (${ABV.spirit}% ABV)`, unit: 'shot' }
  ]
  const extraCalories = {
    'beer': 1.36871,
    'wine': 1.282258064516129,
    'spirit': 1
  }
  // Measurements input as ml value
  const measurements = {
    'pint': 568.261,
    'glass': 175,
    'shot': 25,
    'oz': 29.5735,
    'unit': {
      'beer': 200,
      'wine': 76.086,
      'spirit': 25
    }
  }
  const unitTypes = [
    { type: 'pint', label: 'Pint (568ml)', drinks: 'beer wine spirit' },
    { type: 'glass', label: 'Glass (175ml)', drinks: 'beer wine spirit' },
    { type: 'shot', label: 'Shot (25ml)', drinks: 'beer wine spirit' },
    { type: 'oz', label: 'Ounces (US)', drinks: 'beer wine spirit'},
    { type: 'unit', label: 'Unit (UK)', drinks: 'beer wine spirit' }
  ]
  const unitsPerMl = {
    'beer': 5,
    'wine': 13.1428,
    'spirit': 40
  }

  // const checkIfOz = (input) => (unit === 'oz') ? input * 1.136524 : input * 1
  const checkIfOz = input => input
  const checkIfUnit = (input) => (unit === 'unit') ? measurements.unit[drink] : input
  const units = (quantity * checkIfUnit(measurements[unit]) * (ABV[drink] / 1000))
  console.log(units)
  console.log("quantity: ", quantity, " measurements: ", measurements[unit], " unitsPerMl: ", checkIfOz(ABV[drink] / 1000))
  const caloriesOneUnit = checkIfOz(54 * extraCalories[drink])
  const calories = units * caloriesOneUnit
  const gramsPerUnit = calories / 3.87
  // const gramsPerOunce = parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  // const caloriesPerUnit = (quantity * caloriesOneUnit).toFixed(2) * 1
  const rdaSugar = Math.floor((gramsPerUnit) / 51.67 * 100)
  const marsBars = (gramsPerUnit / 26.05).toFixed(1) * 1
  // const minsOfFrisbee = ((quantity * extraCalories[drink]) * 20.06).toFixed(2)
  const minsOfWalking = Math.floor(calories * 0.278)
  const mlPerUnit = Math.floor(quantity * checkIfUnit(measurements[unit]))
  const mlToOz = (mlPerUnit * 0.03519503).toFixed(2)

  console.log(quantity, unit, drink)

  return (
    <Layout>
      <Row style={{ backgroundColor: '#282c34' }}>
        <Col>
          <header className="App-header">
            <h1>Alcohol-Sugar Calculator</h1>
          </header>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '1rem' }}>
          Alcohol intake converted to relative sugar quantity
        </Col>
      </Row>
      <Row className='no-gutters'>
        <Col style={{ paddingRight: '0.5rem', maxWidth: '5rem' }}>
          <Input
            name='quantity'
            type='number'
            onChange={(event) => setQuantity(event.target.value)}
            value={quantity}
            min='0'
            defaultValue='0'
          />
        </Col>
        <Col style={{ paddingRight: '0.5rem', maxWidth: '7rem' }}>
          <Input type='select' value={unit} onChange={(event) => setUnit(event.target.value)}>
            {unitTypes.map(unit =>
              <option /* hidden={!unit.drinks.includes(drink)} */ value={unit.type}>{unit.label}</option>
            )}
          </Input>
        </Col>
        <Col>
          <Input
            type='select'
            value={drink}
            onChange={(event) => {
              setDrink(event.target.value)
              // drinks.forEach(drink => (drink.type === event.target.value) && setUnit(drink.unit))
            }}>
              {drinks.map(drink => <option value={drink.type}>{drink.label}</option>)}
          </Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type='number'
            value={ABV[drink].toFixed(2)}
            onChange={
              (event) => {
                const input = event.target.value
                const regex = /^\d?(\.?\d{1,2})?$/
                if (regex.test(input)) {
                  setABV({
                    ...ABV,
                    [drink]: event.target.value
                  })
                }
              }
            }
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '1rem 0.25rem 0.25rem 1.5rem' }}>
          <p>{(checkIfOz(gramsPerUnit) > 1000) ? checkIfOz(gramsPerUnit / 1000).toFixed(2) * 1 + 'kg of sugar' : checkIfOz(gramsPerUnit).toFixed(1) * 1 + ' grams of sugar'}</p>
          <p>{(checkIfOz(gramsPerUnit) / 3).toFixed(1) * 1} cubes of sugar</p>
          <p>{rdaSugar}% RDA for sugar</p>
          <Progress
            value={rdaSugar}
            style={{ width: '90%' }}
            color={
              (rdaSugar > 75)
                ? 'danger'
                : (rdaSugar > 50)
                  ? 'warning'
                  : (rdaSugar > 25)
                    ? 'info'
                    : 'success'
            }
          />
          <p></p>
          <p>{marsBars} mars bars (sugar content)</p>
          <p>
            {(minsOfWalking > 60)
              ? (minsOfWalking / 60).toFixed(1) * 1 + ' hours of walking'
              : minsOfWalking + ' minutes of walking'
            }
          </p>
          <p>Calories: {Math.floor(calories)}</p>
          <p>{Math.floor(calories / 2000 * 100)}% RDA of calories (2000/kcal)</p>
          <p>ml: {checkIfOz(mlPerUnit)}</p>
          {(unit === 'unit') && <p>Ounces: {mlToOz * 1}</p>}
          <p>Units: {units.toFixed(1) * 1}</p>
        </Col>
      </Row>
      <Row>
        <footer>
          <p></p>
        </footer>
      </Row>
    </Layout>
  )
}

export default SugarAlcoholCalculator;

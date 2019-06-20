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

  useEffect(() => {
    console.log(quantity)
  })

  const drinks = [
    { type: 'beer', label: 'Beer (5% ABV)', unit: 'pint' },
    { type: 'spirit', label: 'Spirit (40% ABV)', unit: 'shot' },
    { type: 'wine', label: 'Wine (13%)', unit: 'glass' }
  ]
  const drinkTypes = {
    'spirit': 1,
    'beer': 1.36871
  }
  const measurements = {
    'pint': 568.261,
    'shot': 25,
    'unit': 25
  }
  const unitTypes = [
    { type: 'pint', label: 'Pint (568ml)', drinks: 'beer' },
    { type: 'shot', label: 'Shot (25ml)', drinks: 'spirit' },
    { type: 'unit', label: 'Unit (UK)', drinks: 'beer spirit' }
  ]
  const unitsPerMl = {
    'beer': 0.005,
    'spirit': 0.04
  }

  const checkIfOz = (input) => (unit === 'oz') ? input * 1.136524 : input * 1
  const units = (quantity * measurements[unit] * unitsPerMl[drink])
  console.log("quantity: ", quantity, " measurements: ", measurements[unit], " unitsPerMl: ", checkIfOz(unitsPerMl[drink]))
  const caloriesOneUnit = checkIfOz(54 * drinkTypes[drink])
  const calories = units * caloriesOneUnit
  const gramsPerUnit = calories / 3.87
  // const gramsPerOunce = parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  // const caloriesPerUnit = (quantity * caloriesOneUnit).toFixed(2) * 1
  const rdaSugar = Math.floor((gramsPerUnit) / 51.67 * 100)
  const marsBars = (gramsPerUnit / 26.05).toFixed(1) * 1
  // const minsOfFrisbee = ((quantity * drinkTypes[drink]) * 20.06).toFixed(2)
  const minsOfWalking = Math.floor(calories * 0.278)
  const mlPerUnit = Math.floor(quantity * measurements[unit])
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
              <option hidden={!unit.drinks.includes(drink)} value={unit.type}>{unit.label}</option>
            )}
          </Input>
        </Col>
        <Col>
          <Input
            type='select'
            value={drink}
            onChange={(event) => {
              setDrink(event.target.value)
              drinks.forEach(drink => (drink.type === event.target.value) && setUnit(drink.unit))
            }}>
              {drinks.map(drink => <option value={drink.type}>{drink.label}</option>)}
          </Input>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '1rem 0.25rem 0.25rem 1.5rem' }}>
          <p>{(checkIfOz(gramsPerUnit) > 1000) ? checkIfOz(gramsPerUnit / 1000).toFixed(2) * 1 + 'kg of sugar' : checkIfOz(gramsPerUnit).toFixed(1) * 1 + ' grams of sugar'}</p>
          <p>{(checkIfOz(gramsPerUnit) / 3).toFixed(1) * 1} cubes of sugar</p>
          <p>{rdaSugar}% RDA for sugar</p>
          <Progress
            value={rdaSugar}
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

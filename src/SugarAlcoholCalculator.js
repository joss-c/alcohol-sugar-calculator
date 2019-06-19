import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap'
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

  const drinkTypes = {
    'spirit': 1,
    'beer': 1.6
  }
  const measurements = {
    'pint': 568.261,
    'shot': 25,
    'unit': 25
  }
  const unitsPerMl = {
    'beer': 0.005,
    'spirit': 0.04
  }

  const checkIfOz = (input) => (unit === 'oz') ? input * 1.136524 : input * 1
  const units = (quantity * measurements[unit] * unitsPerMl[drink]).toFixed(1) * 1
  console.log("quantity: ", quantity, " measurements: ", measurements[unit], " unitsPerMl: ", checkIfOz(unitsPerMl[drink]))
  const caloriesOneUnit = Math.floor(checkIfOz(54 * drinkTypes[drink]))
  const gramsPerUnit = (quantity * caloriesOneUnit / 3.87).toFixed(2)
  const gramsPerOunce = parseFloat((gramsPerUnit / 100) * 20) + parseFloat(gramsPerUnit)
  const caloriesPerUnit = (quantity * caloriesOneUnit).toFixed(2)
  const rdaSugar = Math.floor((gramsPerUnit) / 51.67 * 100)
  const marsBars = (gramsPerUnit / 26.05).toFixed(1) * 1
  const minsOfFrisbee = ((quantity * drinkTypes[drink]) * 20.06).toFixed(2)
  const minsOfWalking = Math.floor(caloriesPerUnit * 0.278)
  const mlPerUnit = ((quantity * 25) * ((drink === 'beer') ? 8 : 1)).toFixed(2)
  const mlToOz = (mlPerUnit * 0.03519503).toFixed(2)

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
            {(drink === 'beer') && <option value='pint'>Pint (568ml)</option>}
            {(drink === 'spirit') && <option value='shot'>Shot (25ml)</option>}
            {(drink === 'spirit') && <option value='oz'>Ounces</option>}
            {(drink === 'spirit') && <option value='unit'>Units (UK)</option>}
          </Input>
        </Col>
        <Col>
          <Input type='select' value={drink} onChange={(event) => setDrink(event.target.value)}>
            <option value='beer'>Beer (5% ABV)</option>
            <option value='spirit'>Spirit (40% ABV)</option>
            <option value='wine'>Wine (13% ABV)</option>
          </Input>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '1rem 0.25rem 0.25rem 1.5rem' }}>
          <p>{(checkIfOz(gramsPerUnit) > 1000) ? checkIfOz(gramsPerUnit / 1000).toFixed(2) * 1 + 'kg of sugar' : checkIfOz(gramsPerUnit).toFixed(1) * 1 + ' grams of sugar'}</p>
          <p>{(checkIfOz(gramsPerUnit) / 3).toFixed(1) * 1} cubes of sugar</p>
          <p>{rdaSugar}% RDA for sugar</p>
          <p>{marsBars} mars bars (sugar content)</p>
          <p>
            {(minsOfWalking > 60)
              ? (minsOfWalking / 60).toFixed(1) * 1 + ' hours of walking'
              : minsOfWalking + ' minutes of walking'
            }
          </p>
          <p>Calories: {caloriesPerUnit}</p>
          <p>{Math.floor(caloriesPerUnit / 2000 * 100)}% RDA of calories (2000/kcal)</p>
          <p>ml: {checkIfOz(mlPerUnit)}</p>
          {(unit === 'unit') && <p>Ounces: {mlToOz * 1}</p>}
          <p>Units: {units}</p>
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

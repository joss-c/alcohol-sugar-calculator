import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap'
import './App.css';

function SugarAlcoholCalculator() {
  const [unit, setUnit] = useState(0)
  const [selectedUnit, selectUnit] = useState('unit')
  const [drink, setDrink] = useState('spirit')

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
  const minsOfFrisbee = ((unit * drinkTypes[drink]) * 20.06).toFixed(2)
  const minsOfWalking = Math.floor(caloriesPerUnit * 0.278)
  const mlPerUnit = ((unit * 25) * ((drink === 'beer') ? 8 : 1)).toFixed(2)
  const mlToOz = (mlPerUnit * 0.03519503).toFixed(2)
  const checkIfOz = (input) => (selectedUnit === 'unit' ? input * 1 : input * 1.2)

  return (
    <Container>
      <Row>
        <Col sm='10' md='7' lg='5' xl='5' style={{ margin: 'auto' }} >
          <Row style={{ backgroundColor: '#282c34' }}>
            <Col>
              <header className="App-header">
                <h1>Alcohol-Sugar Calculator</h1>
              </header>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col style={{ padding: '1rem' }}>
                  Alcohol intake converted to relative sugar quantity
                </Col>
              </Row>
              <Row className='no-gutters'>
                <Col style={{ paddingRight: '0.5rem', maxWidth: '5rem' }}>
                  <Input
                    name='units'
                    type='number'
                    onChange={(event) => setUnit(event.target.value)}
                    value={unit}
                    min='0'
                    defaultValue='0'
                  />
                </Col>
                <Col style={{ paddingRight: '0.5rem', maxWidth: '7rem' }}>
                  <Input type='select' value={selectedUnit} onChange={(event) => selectUnit(event.target.value)}>
                    <option value='unit'>Units</option>
                    {(drink === 'spirit') && <option value='oz'>Ounces</option>}
                  </Input>
                </Col>
                <Col>
                  <Input type='select' value={drink} onChange={(event) => setDrink(event.target.value)}>
                    <option value='spirit'>Spirit (40% ABV)</option>
                    <option value='beer'>Beer (5% ABV)</option>
                    {/* <option value='wine'>Wine</option> */}
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col style={{ padding: '1rem 0.25rem 0.25rem 1.5rem' }}>
                  <p>{(checkIfOz(gramsPerUnit) > 1000) ? checkIfOz(gramsPerUnit / 1000).toFixed(2) + 'kg of sugar' : checkIfOz(gramsPerUnit) + ' grams of sugar'}</p>
                  <p>{((unitTypes[selectedUnit]) / 3).toFixed(1)} cubes of sugar</p>
                  <p>{Math.floor((unitTypes[selectedUnit]) / 51.67 * 100)}% RDA for sugar</p>
                  <p>{(unitTypes[selectedUnit] / 26.05).toFixed(1)} mars bars (sugar content)</p>
                  <p>
                    {(minsOfWalking > 60)
                      ? checkIfOz((minsOfWalking / 60)).toFixed(1) + ' hours of walking'
                      : checkIfOz(minsOfWalking) + ' minutes of walking'
                    }
                  </p>
                  <p>Calories: {Math.floor(checkIfOz(caloriesPerUnit))}</p>
                  <p>{Math.floor(checkIfOz(caloriesPerUnit / 2000 * 100))}% RDA of calories (2000/kcal)</p>
                  <p>ml: {checkIfOz(mlPerUnit)}</p>
                  {(selectedUnit === 'unit') && <p>Ounces: {mlToOz}</p>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <footer>
              <p></p>
            </footer>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SugarAlcoholCalculator;

import React, { useState } from 'react'
import { Form, Row, Col, FormGroup, Label, Input } from 'reactstrap'

import { AbvPageWrapper } from './AbvPage.styles'
import { abvCalculator } from '../../utils'

const AbvPage: React.FC = () => {
  const [{ og, fg }, setData] = useState<{
    og: number | ''
    fg: number | ''
  }>({
    og: '',
    fg: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setData((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: Math.abs(e.target.valueAsNumber) || e.target.value,
      }),
    )
  }

  const calculateAbv = () => {
    if (og !== '' && og > 0 && fg !== '' && fg > 0)
      return abvCalculator(og, fg) > 0 ? abvCalculator(og, fg) : 0
    else return 0
  }

  return (
    <AbvPageWrapper>
      <h2>Калькулятор крепости</h2>
      <p style={{ color: 'rgba(0, 0, 0, 0.5)', marginBottom: 5 }}>
        Введите все данные, крепость будет расчитана автоматически
      </p>
      <h3>Крепость = {calculateAbv()}%</h3>
      <Form>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="og">Начальная плотность</Label>
              <Input
                type="number"
                name="og"
                id="og"
                placeholder="%"
                min={0}
                onChange={handleChange}
                value={og}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="fg">Конечная плотность</Label>
              <Input
                type="number"
                name="fg"
                id="fg"
                placeholder="%"
                min={0}
                onChange={handleChange}
                value={fg}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </AbvPageWrapper>
  )
}

export default AbvPage

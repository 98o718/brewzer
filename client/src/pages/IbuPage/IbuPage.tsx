import React, { useState, useRef } from 'react'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { IbuPageWrapper, ItemWrapper, ListButton } from './IbuPage.styles'
import { CalculatorHop, Hop } from '../../types'
import { ibuCalculator } from '../../utils'
import { Global, css } from '@emotion/core'

const IbuPage: React.FC = () => {
  const [{ batchVolume, volume, og }, setInformation] = useState<{
    batchVolume: number | ''
    volume: number | ''
    og: number | ''
  }>({
    batchVolume: '',
    volume: '',
    og: '',
  })

  const emptyHop = {
    weight: '',
    alpha: '',
    time: '',
  }

  const [hops, setHops] = useState<CalculatorHop[]>([])
  const [hop, setHop] = useState<CalculatorHop>(emptyHop as CalculatorHop)

  const hopRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setInformation((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const handleHopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setHop((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const addHop = () => {
    if (
      hop.alpha !== '' &&
      hop.alpha > 0 &&
      hop.weight !== '' &&
      hop.weight > 0 &&
      hop.time !== '' &&
      hop.time > 0
    ) {
      setHops((prev) => prev.concat([hop]))
      setHop(emptyHop as CalculatorHop)
      if (hopRef.current !== null) hopRef.current.focus()
    }
  }

  const deleteHop = (idx: number) => {
    setHops((prev) => prev.filter((item, index) => index !== idx))
  }

  const calculateIbu = (hops: CalculatorHop[]) => {
    if (
      batchVolume !== '' &&
      batchVolume > 0 &&
      volume !== '' &&
      volume > 0 &&
      og !== '' &&
      og > 0
    ) {
      return ibuCalculator(og, volume, batchVolume, hops as Hop[]) | 0
    } else return 0
  }

  return (
    <IbuPageWrapper>
      <Global
        styles={css`
          .wrapped-col {
            @media (max-width: 675px) {
              flex-basis: unset;
            }
          }
        `}
      />
      <h2>Калькулятор IBU</h2>
      <p style={{ color: 'rgba(0, 0, 0, 0.5)', marginBottom: 5 }}>
        Введите все данные, IBU будет расчитано автоматически
      </p>
      <h3>IBU = {calculateIbu(hops)}</h3>
      <Form>
        <Row form>
          <Col className="wrapped-col">
            <FormGroup>
              <Label for="batchVolume">Объем до кипячения</Label>
              <Input
                type="number"
                name="batchVolume"
                id="batchVolume"
                placeholder="В литрах"
                min={0}
                value={batchVolume}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col className="wrapped-col">
            <FormGroup>
              <Label for="volume">Объем после кипячения</Label>
              <Input
                type="number"
                name="volume"
                id="volume"
                placeholder="В литрах"
                min={0}
                onChange={handleChange}
                value={volume}
              />
            </FormGroup>
          </Col>
          <Col className="wrapped-col">
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
        </Row>
      </Form>
      <Card
        onKeyDown={(e: React.KeyboardEvent) => {
          e.key === 'Enter' && addHop()
        }}
      >
        <CardBody>
          <h6>Хмель</h6>
          {!!hops.length && (
            <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
              {hops.map((hop, idx) => {
                return (
                  <ListGroupItem
                    key={idx}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ItemWrapper>
                      <Badge pill>{hop.weight} г</Badge>
                      <Badge color="success" pill>
                        {hop.alpha} %
                      </Badge>
                      <Badge color="primary" pill>
                        {hop.time} мин
                      </Badge>
                      <Badge color="warning" pill>
                        {calculateIbu([hop])} IBU
                      </Badge>
                    </ItemWrapper>
                    <span>
                      <ListButton type="button" onClick={() => deleteHop(idx)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </ListButton>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          )}
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="number"
                  name="alpha"
                  id="alpha"
                  min={0}
                  placeholder="Alpha Acid, %"
                  value={hop.alpha}
                  onChange={handleHopChange}
                  innerRef={hopRef}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="number"
                  name="weight"
                  id="weight"
                  min={0}
                  placeholder="Г"
                  value={hop.weight}
                  onChange={handleHopChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="number"
                  name="time"
                  id="time"
                  min={0}
                  placeholder="Минуты"
                  value={hop.time}
                  onChange={handleHopChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                style={{ width: '100%' }}
                color="primary"
                onClick={addHop}
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </IbuPageWrapper>
  )
}

export default IbuPage

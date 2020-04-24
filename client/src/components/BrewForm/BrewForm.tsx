import React from 'react'
import {
  BrewFormWrapper,
  ButtonContainer,
  ButtonInner,
  DataWrapper,
} from './BrewForm.styles'
import 'react-datepicker/dist/react-datepicker.css'
import { BarLoader } from 'react-spinners'
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CreateBrew, BrewDescription } from '../../types'
import TextareaAutosize from 'react-autosize-textarea'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale'
import { Global, css } from '@emotion/core'

type BrewFormProps = {
  isLoading: boolean
  isSending: boolean
  edit: boolean
  id: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  brew: CreateBrew | BrewDescription
  setDate: (date: Date | null, dateType: string) => void
  handleSubmit: () => Promise<string | number | undefined>
}

const BrewForm = ({
  edit,
  isLoading,
  isSending,
  id,
  handleChange,
  brew,
  setDate,
  handleSubmit,
}: BrewFormProps) => {
  registerLocale('ru', ru)

  return (
    <BrewFormWrapper>
      <Global
        styles={css`
          .react-datepicker__time {
            border-top-right-radius: 0.3rem;
            border-bottom-right-radius: 0.3rem;
          }

          @media (max-width: 765px) {
            .react-datepicker__time-container {
              width: 55px;
            }

            .react-datepicker__header--time {
              display: none;
            }

            .react-datepicker__time-box {
              width: 100% !important;
            }
          }
        `}
      />
      <h1>{edit ? 'Редактирование варки' : 'Новая варка'}</h1>
      {isLoading ? (
        <BarLoader />
      ) : (
        <Form
          className="d-flex flex-column align-items-center"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <Link to={`/recipes/${edit ? brew.recipe : id}`}>{brew.title}</Link>

          <Row form style={{ marginTop: 15 }}>
            <Col>
              <FormGroup>
                <Label for="volume">Объем</Label>
                <Input
                  type="number"
                  name="volume"
                  id="volume"
                  placeholder="Необязательно"
                  onChange={handleChange}
                  value={brew.volume !== 0 && !brew.volume ? '' : brew.volume}
                  min={0}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="og">НП</Label>
                <Input
                  type="number"
                  name="og"
                  id="og"
                  placeholder="Необязательно"
                  onChange={handleChange}
                  value={brew.og !== 0 && !brew.og ? '' : brew.og}
                  min={0}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="fg">КП</Label>
                <Input
                  type="number"
                  name="fg"
                  id="fg"
                  placeholder="Необязательно"
                  onChange={handleChange}
                  value={brew.fg !== 0 && !brew.fg ? '' : brew.fg}
                  min={0}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form style={{ width: '100%' }}>
            <FormGroup style={{ width: '100%' }}>
              <Input
                type="textarea"
                name="comment"
                tag={TextareaAutosize}
                placeholder="Комментарий"
                id="comment"
                onChange={handleChange}
                value={brew.comment}
              />
            </FormGroup>
          </Row>
          <DataWrapper>
            <FormGroup>
              <Label>Дата варки</Label>
              <DatePicker
                inline
                showTimeSelect
                timeCaption="Время"
                timeIntervals={15}
                selected={new Date(brew.brewDate)}
                onChange={(date) => setDate(date, 'brewDate')}
                className="form-control"
                locale="ru"
              />
            </FormGroup>
            <FormGroup>
              <Label>Предполагаемая дата розлива</Label>
              <DatePicker
                inline
                showTimeSelect
                timeCaption="Время"
                timeIntervals={15}
                selected={new Date(brew.bottlingDate || '')}
                onChange={(date) => setDate(date, 'bottlingDate')}
                className="form-control"
                locale="ru"
              />
            </FormGroup>
          </DataWrapper>
          <ButtonContainer>
            <Button
              style={{ width: 200 }}
              onClick={handleSubmit}
              color="success"
              disabled={isSending}
            >
              <ButtonInner>
                {isSending ? (
                  <BarLoader color="white" />
                ) : edit ? (
                  'Сохранить'
                ) : (
                  'Добавить'
                )}
              </ButtonInner>
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </BrewFormWrapper>
  )
}

export default BrewForm

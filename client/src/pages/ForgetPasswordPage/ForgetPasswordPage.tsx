import React, { useState, useRef, useEffect } from 'react'
import {
  ForgetPasswordPageWrapper,
  ButtonInner,
  ButtonContainer,
} from './ForgetPasswordPage.styles'

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap'
import { BarLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import constants from '../../constants'
import { useHistory } from 'react-router'
import { useAtom } from '@reatom/react'
import { userAtom } from '../../model'

const ResetPasswordPage: React.FC = () => {
  const history = useHistory()
  const user = useAtom(userAtom)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim())
  }

  const isFirstTime = useRef(true)

  const validate = (email: string) => {
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let error = false

    if (!emailRegexp.test(email) || !email) {
      error = true
    }

    return error
  }

  useEffect(() => {
    if (user !== null) {
      history.push('/')
    }
  }, [user, history])

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      return
    }

    let error = validate(email)

    setError(error)
  }, [email, isFirstTime])

  const handleSubmit = () => {
    setLoading(true)
    const isInvalid = validate(email)

    if (isInvalid) {
      toast.error('Проверьте форму!')
      return
    }

    fetch(constants.FORGET_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Ошибка восстановления доступа.')
        toast.success('Ссылка для восстановления отправлена на указанный email')
        setTimeout(() => {
          history.push('/signin')
        }, 1500)
      })
      .catch(error => {
        console.error(error)
        toast.error(error.message)
        setLoading(false)
      })
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !validate(email) && !isLoading) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <ForgetPasswordPageWrapper>
      <Form style={{ width: 230 }}>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                spellCheck={false}
                placeholder="ivanov@mail.ru"
                onChange={handleChange}
                value={email}
                invalid={error}
                onKeyDown={handleEnter}
              />
              <FormFeedback>Введите корректный email</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <ButtonContainer>
          <Button
            color="success"
            size="lg"
            style={{ width: '100%' }}
            onClick={handleSubmit}
            disabled={isFirstTime.current || error || isLoading}
          >
            <ButtonInner>
              {isLoading ? <BarLoader color="white" /> : 'Восстановить доступ'}
            </ButtonInner>
          </Button>
        </ButtonContainer>
      </Form>
    </ForgetPasswordPageWrapper>
  )
}

export default ResetPasswordPage

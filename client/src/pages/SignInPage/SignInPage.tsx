import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  SignInPageWrapper,
  ButtonContainer,
  ButtonInner,
} from './SignInPage.styles'
import { Credentials, ErrorTypes } from './types'

import { useAction } from '@reatom/react'
import { signIn } from '../../model'

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
import { useHistory } from 'react-router'
import { getFingerprint } from '../../utils/getFingerprint'
import localforage from 'localforage'

const SignInPage: React.FC = () => {
  const history = useHistory()
  const doSignIn = useAction(signIn)

  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorTypes[]>([])
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(
      Object.assign({}, credentials, {
        [event.target.name]: event.target.value.trim(),
      }),
    )
  }

  const isFirstTime = useRef(true)

  const validate = (credentials: Credentials) => {
    const { username, password } = credentials

    const errors = []

    if (!username) {
      errors.push(ErrorTypes.USERNAME)
    }

    if (!password) {
      errors.push(ErrorTypes.PASSWORD)
    }

    return errors
  }

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      return
    }

    let errors = validate(credentials)

    setErrors(errors)
  }, [credentials, isFirstTime])

  const handleSubmit = async () => {
    setLoading(true)
    const isInvalid = validate(credentials).length > 0

    if (isInvalid) {
      toast.error('Проверьте форму!')
      setLoading(false)
      return
    }

    const fingerprint = await getFingerprint()

    const r = await fetch(process.env.REACT_APP_SIGNIN_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...credentials, fingerprint }),
    })

    const { accessToken, refreshToken, ...data } = await r.json()

    if (r.ok) {
      await localforage.setItem('accessToken', accessToken)
      await localforage.setItem('refreshToken', refreshToken)
      doSignIn(data)
      toast.success('Успешный вход!')
      history.push('/')
    } else {
      setLoading(false)
      toast.error('Ошибка входа или логин/пароль неправильный.')
    }
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      validate(credentials).length === 0 &&
      !isLoading
    )
      handleSubmit()
  }

  return (
    <SignInPageWrapper>
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="username">Логин</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="ivanov"
                onChange={handleChange}
                value={credentials.username}
                invalid={errors.includes(ErrorTypes.USERNAME)}
                onKeyDown={handleEnter}
                spellCheck={false}
              />
              <FormFeedback>Введите email или имя пользователя</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Пароль</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={credentials.password}
                invalid={errors.includes(ErrorTypes.PASSWORD)}
                onKeyDown={handleEnter}
                spellCheck={false}
              />
              <FormFeedback>Введите пароль</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <ButtonContainer>
          <Button
            color="success"
            size="lg"
            style={{ width: '100%' }}
            onClick={handleSubmit}
            disabled={isFirstTime.current || errors.length > 0 || isLoading}
          >
            <ButtonInner>
              {isLoading ? <BarLoader color="white" /> : 'Войти'}
            </ButtonInner>
          </Button>
        </ButtonContainer>
        <Row form style={{ marginTop: 15, textAlign: 'center' }}>
          <Col>
            <Link to="/forget-password">Забыли пароль?</Link>
          </Col>
        </Row>
      </Form>
    </SignInPageWrapper>
  )
}

export default SignInPage

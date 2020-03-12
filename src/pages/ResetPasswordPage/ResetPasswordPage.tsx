import React, { useState, useEffect, useRef } from 'react'
import {
  ResetPasswordPageWrapper,
  ButtonContainer,
  ButtonInner,
} from './ResetPasswordPage.styles'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { ResetPasswordParams } from './types'
import constants from '../../constants'

import { useAtom } from '@reatom/react'

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
import { authAtom } from '../../atoms/auth.atoms'

const ResetPasswordPage = (props: RouteComponentProps<ResetPasswordParams>) => {
  const history = useHistory()
  const isAuth = useAtom(authAtom)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim())
  }

  const isFirstTime = useRef(true)

  const validate = (password: string) => {
    const passRegexp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

    let error = false

    if (!passRegexp.test(password) || !password) {
      error = true
    }

    return error
  }

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      return
    }

    let error = validate(password)

    setError(error)
  }, [password, isFirstTime])

  useEffect(() => {
    if (isAuth) {
      history.push('/')
    }
  }, [isAuth, history])

  const handleSubmit = () => {
    setLoading(true)

    const { username, token } = props.match.params

    const isInvalid = validate(password)

    if (isInvalid) {
      toast.error('Проверьте форму!')
      return
    }

    fetch(constants.RESET_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, token }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Ошибка восстановления доступа!')
        toast.success('Успешное восстановление доступа!')
        setTimeout(() => {
          history.push('/signin')
        }, 1500)
      })
      .catch(error => {
        console.error(error)
        toast.error(error.message)
      })
  }

  return (
    <ResetPasswordPageWrapper>
      <Form style={{ width: 230 }}>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="password">Пароль</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={password}
                invalid={error}
                spellCheck={false}
              />
              <FormFeedback>
                Пароль должен содержать:
                <br />1 заглавную букву,
                <br />1 строчную,
                <br />1 цифру или спецсимвол,
                <br />и быть длиннее 8 символов
              </FormFeedback>
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
    </ResetPasswordPageWrapper>
  )
}

export default ResetPasswordPage

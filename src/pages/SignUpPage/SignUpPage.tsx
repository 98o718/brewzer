import React, { useCallback, useState, useEffect, useRef } from 'react'
import {
  SignUpPageWrapper,
  ButtonContainer,
  AvatarWrapper,
  ButtonInner,
} from './SignUpPage.styles'
import { UserType, ErrorTypes } from './types'
import constants from '../../constants'

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
import { useDropzone } from 'react-dropzone'
import Avatar from 'react-avatar'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const SignUpPage: React.FC = () => {
  const history = useHistory()

  const [isLoading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [errors, setErrors] = useState<ErrorTypes[]>([])
  const [user, setUser] = useState<UserType>({
    username: '',
    email: '',
    password: '',
    agree: false,
    avatar: null,
  })

  const onDrop = useCallback(acceptedFiles => {
    setAvatar(URL.createObjectURL(acceptedFiles[0]))
    setUser(prev => Object.assign({}, prev, { avatar: acceptedFiles }))
  }, [])

  const removeAvatar = () => {
    setAvatar('')
    setUser(prev => Object.assign({}, prev, { avatar: null }))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      Object.assign({}, user, {
        [event.target.name]: event.target.value.trim(),
      })
    )
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      Object.assign({}, user, { [event.target.name]: event.target.checked })
    )
  }

  const isFirstTime = useRef(true)

  const validate = (user: UserType) => {
    const { email, password, username } = user

    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const passRegexp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

    const errors = []

    if (!emailRegexp.test(email) || !email) {
      errors.push(ErrorTypes.EMAIL)
    }

    if (!passRegexp.test(password) || !password) {
      errors.push(ErrorTypes.PASSWORD)
    }

    if (!username) {
      errors.push(ErrorTypes.USERNAME)
    }

    return errors
  }

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      return
    }

    let errors = validate(user)

    setErrors(errors)
  }, [user, isFirstTime])

  const handleSubmit = () => {
    setLoading(true)
    const { username, email, password, avatar, agree } = user
    const isInvalid = validate(user).length > 0

    if (!agree) {
      toast.error('Согласитесь на обработку данных!')
      return
    }

    if (isInvalid) {
      toast.error('Проверьте форму!')
      return
    }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    avatar && formData.append('avatar', avatar[0])

    fetch(constants.SIGNUP_URL, {
      method: 'POST',
      body: formData,
    })
      .then(r => {
        if (!r.ok) throw new Error('Ошибка регистрации')
        toast.success('Успешная регистрация!')
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
    <SignUpPageWrapper>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="ivanov@mail.ru"
            onChange={handleChange}
            value={user.email}
            invalid={errors.includes(ErrorTypes.EMAIL)}
            spellCheck={false}
          />
          <FormFeedback>Введите корректный email</FormFeedback>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="username">Имя пользователя</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="vanya74"
                onChange={handleChange}
                value={user.username}
                invalid={errors.includes(ErrorTypes.USERNAME)}
                spellCheck={false}
              />
              <FormFeedback>Обязательное поле!</FormFeedback>
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
                value={user.password}
                invalid={errors.includes(ErrorTypes.PASSWORD)}
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

        <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Аватар</Label>
          <AvatarWrapper>
            <Avatar
              value={user.username.substring(0, 10)}
              src={avatar}
              size="150"
              maxInitials={10}
              round
            />
            {avatar && (
              <Button
                close
                onClick={removeAvatar}
                style={{
                  display: 'inline',
                  alignSelf: 'flex-start',
                  position: 'absolute',
                }}
              />
            )}
            <div
              className="drop"
              {...getRootProps()}
              style={{
                width: '200px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '15px',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Перетащите сюда изображение или нажмите для выбора</p>
              )}
            </div>
          </AvatarWrapper>
        </FormGroup>

        <FormGroup check className="text-center">
          <Input
            type="checkbox"
            name="agree"
            id="agree"
            onChange={handleCheck}
            checked={user.agree}
          />
          <Label for="agree" check>
            Согласие на обработку персональных данных
          </Label>
        </FormGroup>
        <ButtonContainer>
          <Button
            color="primary"
            size="lg"
            style={{ marginTop: '15px', width: '100%' }}
            onClick={handleSubmit}
            disabled={isFirstTime.current || errors.length > 0 || isLoading}
          >
            <ButtonInner>
              {isLoading ? <BarLoader color="white" /> : 'Зарегистрироваться'}
            </ButtonInner>
          </Button>
        </ButtonContainer>
      </Form>
    </SignUpPageWrapper>
  )
}

export default SignUpPage

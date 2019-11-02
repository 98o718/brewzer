import React, { useCallback, useState } from 'react'
import {
  SignUpPageWrapper,
  ButtonContainer,
  AvatarWrapper,
} from './SignUpPage.styles'

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import Avatar from 'react-avatar'

const SignUpPage: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {
    setAvatar(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [avatar, setAvatar] = useState('')

  type UserType = {
    username: string
    email: string
    password: string
    agree: boolean
  }

  const [user, setUser] = useState<UserType>({
    username: '',
    email: '',
    password: '',
    agree: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      Object.assign({}, user, { [event.target.name]: event.target.value })
    )
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      Object.assign({}, user, { [event.target.name]: event.target.checked })
    )
  }

  return (
    <SignUpPageWrapper>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="ivanov@mail.ru"
            onChange={handleChange}
            value={user.email}
          />
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
              />
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
              />
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
                onClick={() => setAvatar('')}
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
              {/* <Avatar
                name={user.username}
                src={avatar}
                //   style={{ objectFit: 'contain' }}
              /> */}
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Перетащите сюда изображение или нажмите для выбора</p>
              )}
            </div>
          </AvatarWrapper>
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            name="agree"
            id="agree"
            onChange={handleCheck}
            checked={user.agree}
          />
          <Label for="agree" check>
            Согласен на обработку персональных данных
          </Label>
        </FormGroup>
        <ButtonContainer>
          <Button
            color="primary"
            size="lg"
            style={{ marginTop: '15px', width: '100%' }}
          >
            Зарегистрироваться
          </Button>
        </ButtonContainer>
      </Form>
    </SignUpPageWrapper>
  )
}

export default SignUpPage

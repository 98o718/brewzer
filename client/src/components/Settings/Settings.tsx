import React from 'react'
import {
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'
import Avatar from 'react-avatar'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import { format } from 'date-fns'

import { SettingsWrapper, AvatarWrapper, ButtonInner } from './Settings.styles'
import { Session } from '../../types'

type SettingsProps = {
  avatarUrl: string
  username: string
  removeAvatar: () => void
  handleAvatarSubmit: () => Promise<void>
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps
  getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps
  isDragActive: boolean
  avatarLoading: boolean
  changePasswordDto: {
    password: string
    newPassword: string
  }
  passwordLoading: boolean
  passwordError: string[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePasswordSubmit: () => Promise<void>
  sessions: Session[] | undefined
  sessionsLoading: boolean
  sessionsError: boolean
  closingSessions: boolean
  handleSessionsClose: () => Promise<void>
}

const Settings = ({
  avatarUrl,
  username,
  removeAvatar,
  getInputProps,
  getRootProps,
  isDragActive,
  handleAvatarSubmit,
  avatarLoading,
  changePasswordDto,
  passwordLoading,
  passwordError,
  handleChange,
  handleChangePasswordSubmit,
  sessions,
  sessionsLoading,
  sessionsError,
  closingSessions,
  handleSessionsClose,
}: SettingsProps) => {
  return (
    <SettingsWrapper>
      <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
        <Label>Аватар</Label>
        <AvatarWrapper>
          <div
            style={{
              borderRadius: '50%',
              background: avatarUrl !== '' ? 'transparent' : 'lightgrey',
            }}
          >
            <Avatar
              value={username}
              src={avatarUrl}
              size="150"
              maxInitials={10}
              round
            />
          </div>
          {avatarUrl !== '' && (
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
        <Button
          className="w-100"
          color="success"
          onClick={handleAvatarSubmit}
          disabled={avatarLoading}
        >
          <ButtonInner>
            {avatarLoading ? <BarLoader color="white" /> : 'Сменить аватар'}
          </ButtonInner>
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="password">Старый пароль</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          onChange={handleChange}
          value={changePasswordDto.password}
          invalid={passwordError.includes('OLD')}
          spellCheck={false}
        />
        <FormFeedback>Старый пароль не должен быть пустым</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="newPassword">Новый пароль</Label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="••••••••"
          onChange={handleChange}
          value={changePasswordDto.newPassword}
          invalid={passwordError.includes('NEW')}
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
      <Button
        className="w-100 mb-3"
        color="success"
        onClick={handleChangePasswordSubmit}
        disabled={passwordLoading}
      >
        <ButtonInner>
          {passwordLoading ? <BarLoader color="white" /> : 'Сменить пароль'}
        </ButtonInner>
      </Button>
      <Label>Сессии</Label>
      {sessionsLoading ? (
        <BarLoader color="black" width="100%" />
      ) : (
        <ListGroup>
          {sessionsError ? (
            <ListGroupItem>Ошибка загрузки</ListGroupItem>
          ) : (
            sessions &&
            sessions.map((session) => (
              <ListGroupItem key={session.id}>
                <b>{session.ip}</b> –{' '}
                {format(new Date(session.updated), 'HH:MM')}&nbsp;
                {format(new Date(session.updated), 'dd.MM.yyyy')}
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      )}
      {sessions && (
        <Button
          className="w-100 mt-3"
          color="danger"
          onClick={handleSessionsClose}
          disabled={closingSessions}
        >
          <ButtonInner>
            {closingSessions ? (
              <BarLoader color="white" />
            ) : (
              'Завершить все сеансы'
            )}
          </ButtonInner>
        </Button>
      )}
    </SettingsWrapper>
  )
}

export default Settings

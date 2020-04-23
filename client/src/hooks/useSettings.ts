import { useState, useCallback } from 'react'
import { useAtom, useAction } from '@reatom/react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import axios from 'axios'

import { userAtom, signIn, logout } from '../model'
import { useFetch } from './useFetch'
import { Session } from '../types'

export const useSettings = () => {
  const user = useAtom(userAtom)
  const doSignIn = useAction(signIn)
  const doLogout = useAction(logout)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(
    user !== null && user.fullAvatar.startsWith('http') ? user.fullAvatar : '',
  )
  const [avatar, setAvatar] = useState<null | FileList>(null)
  const onDrop = useCallback((acceptedFiles) => {
    setAvatarUrl(URL.createObjectURL(acceptedFiles[0]))
    setAvatar(acceptedFiles)
  }, [])

  const [changePasswordDto, setChangePasswordDto] = useState({
    password: '',
    newPassword: '',
  })
  const [passwordError, setPasswordError] = useState<string[]>([])
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [sessions, sessionsLoading, sessionsError] = useFetch<Session[]>(
    process.env.REACT_APP_SESSIONS_URL!,
  )
  const [closingSessions, setClosingSessions] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeAvatar = () => {
    setAvatarUrl('')
    setAvatar(null)
  }

  const handleAvatarSubmit = async () => {
    setAvatarLoading(true)
    const formData = new FormData()
    if (avatar !== null) {
      formData.append('avatar', avatar[0])
    }

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_CHANGE_AVATAR_URL!,
        formData,
      )

      toast.success('Аватар успешно изменен!')
      setAvatarLoading(false)
      doSignIn(data)
    } catch {
      toast.error('Ошибка смены аватара!')
      setAvatarLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setPasswordError([])
    setChangePasswordDto((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.value,
      }),
    )
  }

  const handleChangePasswordSubmit = async () => {
    const passRegexp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

    let errors = []

    if (
      !passRegexp.test(changePasswordDto.newPassword) ||
      changePasswordDto.newPassword === ''
    ) {
      errors.push('NEW')
    }

    if (changePasswordDto.password === '') {
      errors.push('OLD')
    }

    if (errors.length !== 0) {
      setPasswordError(errors)
      return
    } else {
      setPasswordLoading(true)

      try {
        await axios.patch(
          process.env.REACT_APP_CHANGE_PASSWORD_URL!,
          changePasswordDto,
        )
        toast.success('Пароль изменен!')
        setPasswordLoading(false)
        setChangePasswordDto({
          password: '',
          newPassword: '',
        })
      } catch {
        toast.error(
          'Ошибка изменения пароля! Возможно старый пароль неверен, попробуйте еще раз!',
          {
            autoClose: 3000,
          },
        )
        setPasswordLoading(false)
        setChangePasswordDto({
          password: '',
          newPassword: '',
        })
      }
    }
  }

  const handleSessionsClose = async () => {
    setClosingSessions(true)
    try {
      await axios.post(process.env.REACT_APP_CLOSE_SESSIONS_URL!)
      toast.success('Сеансы завершены!')
      setClosingSessions(false)
      doLogout()
    } catch {
      toast.error('Ошибка завершения сеансов')
      setClosingSessions(false)
    }
  }

  return {
    avatarUrl,
    username: user !== null ? user.username.substring(0, 10) : '',
    avatarLoading,
    removeAvatar,
    getInputProps,
    getRootProps,
    isDragActive,
    handleAvatarSubmit,
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
  }
}

import { declareAction } from '@reatom/core'

export const signIn = declareAction<{ username: string; avatar: string }>(
  'sign_in'
)

export const logout = declareAction('logout')

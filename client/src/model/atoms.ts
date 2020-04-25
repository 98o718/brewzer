import { declareAtom } from '@reatom/core'
import localforage from 'localforage'

import { signIn, logout } from './actions'
import { User } from './types'

export const userAtom = declareAtom<User | null>(['user'], null, (on) => [
  on(signIn, (state, value) => value),
  on(logout, () => {
    localforage
      .removeItem('accessToken')
      .then(() => localforage.removeItem('refreshToken'))
    return null
  }),
])

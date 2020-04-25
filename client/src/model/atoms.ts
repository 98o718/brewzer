import { declareAtom } from '@reatom/core'
import Cookies from 'universal-cookie'

import { signIn, logout } from './actions'
import { User } from './types'

const cookies = new Cookies()

export const userAtom = declareAtom<User | null>(['user'], null, (on) => [
  on(signIn, (state, value) => value),
  on(logout, (state) => {
    // cookies.remove('accessToken', { path: '/' })
    // cookies.remove('refreshToken', { path: '/' })
    return null
  }),
])

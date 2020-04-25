import { declareAction } from '@reatom/core'
import { User, Tokens } from './types'

export const signIn = declareAction<User & Tokens>('sign_in')

export const logout = declareAction('logout')

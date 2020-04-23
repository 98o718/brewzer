import axios from 'axios'
import { getFingerprint } from './getFingerprint'
import Cookies from 'universal-cookie'
import { Store } from '@reatom/core'
import { logout } from '../model'

let isAlreadyFetchingAccessToken = false
let subscribers: any[] = []

const onAccessTokenFetched = (access_token: string) => {
  subscribers = subscribers.filter((callback) => callback(access_token))
}

const addSubscriber = (callback: any) => {
  subscribers.push(callback)
}

export const setupInterceptors = (store: Store) => {
  axios.interceptors.request.use(
    (config) => {
      const token = new Cookies().get('accessToken')

      if (!!token) {
        config.headers.Authorization = token
      }

      return config
    },
    (err) => Promise.reject(err),
  )

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const {
        config,
        response: { status },
      } = error
      const originalRequest = config

      if (
        config.url !== process.env.REACT_APP_REFRESH_TOKEN_URL &&
        status === 401
      ) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true

          getFingerprint()
            .then((fingerprint) =>
              axios.post(process.env.REACT_APP_REFRESH_TOKEN_URL!, {
                fingerprint,
              }),
            )
            .then(({ data: { accessToken } }) => {
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(accessToken)
            })
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((access_token: string) => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      } else if (
        config.url === process.env.REACT_APP_REFRESH_TOKEN_URL &&
        status === 401
      ) {
        store.dispatch(logout())
      }
      console.error(error)
      return Promise.reject(error)
    },
  )
}

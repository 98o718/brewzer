import React, { useEffect } from 'react'
import { Global, css } from '@emotion/core'
import { Store } from '@reatom/core'
import { connectReduxDevtools } from '@reatom/debug'

import emotionNormalize from 'emotion-normalize'
import 'bootstrap/dist/css/bootstrap.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Layout, BeerWave, NoPrint } from './components'
import { Router } from './Router'
import localforage from 'localforage'
import { Cookies } from 'react-cookie'

const App = ({ store }: { store: Store }) => {
  // eslint-disable-next-line
  useEffect(() => connectReduxDevtools(store), [])

  useEffect(() => {
    const cookies = new Cookies().get('token')
    localforage.getItem('token').then((value) => {
      alert(cookies)
      alert(value)
    })
  }, [])

  useEffect(() => {
    return store.subscribe(() =>
      localforage.setItem('app_store', JSON.stringify(store.getState())),
    )
  })

  return (
    <>
      <ToastContainer
        position="top-right"
        style={{ marginTop: 50 }}
        autoClose={1500}
      />
      <Global
        styles={css`
          ${emotionNormalize}

          html {
            height: 100%;
          }

          #root,
          body {
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
              'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
              'Noto Color Emoji';
          }

          h2 {
            font-weight: 300;
            font-size: 2rem;
          }

          .Toastify__toast {
            border-radius: 5px;

            &--success {
              background: #29a744;
            }

            &--error {
              background: #dc3545;
            }
          }

          @media only screen and (max-width: 480px) {
            .Toastify__toast {
              border-radius: 1px;
            }
          }

          @media (max-width: 767px) and (max-height: 415px) {
            .dropdown-menu {
              max-height: 130px;
              overflow-y: scroll;
            }
          }
        `}
      />
      <Layout>
        <Router />
      </Layout>
      <NoPrint>
        <BeerWave />
      </NoPrint>
    </>
  )
}

export default App

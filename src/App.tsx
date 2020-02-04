import React, { useEffect } from 'react'
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { createStore } from '@reatom/core'
import { context } from '@reatom/react'
import { connectReduxDevtools } from '@reatom/debug'

import emotionNormalize from 'emotion-normalize'
import 'bootstrap/dist/css/bootstrap.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Layout,
  BeerWave,
  Header,
  RecipesContainer,
  RecipeContainer,
} from './components'
import {
  SignUpPage,
  SignInPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
} from './pages'

const App: React.FC = () => {
  const store = createStore(
    JSON.parse(`${localStorage.getItem('app_store')}`) || {}
  )

  // eslint-disable-next-line
  useEffect(() => connectReduxDevtools(store), [])

  useEffect(() => {
    return store.subscribe(() =>
      localStorage.setItem('app_store', JSON.stringify(store.getState()))
    )
  })

  return (
    <context.Provider value={store}>
      <Router>
        <ToastContainer position="top-right" style={{ marginTop: 50 }} />
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
          `}
        />

        <Layout>
          <Header />
          <Switch>
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route
              exact
              path="/forget-password"
              component={ForgetPasswordPage}
            />
            <Route
              path="/reset-password/:username/:token"
              component={ResetPasswordPage}
            />
            <Route exact path="/(|recipes)" component={RecipesContainer} />
            <Route path="/recipes/:id" component={RecipeContainer} />
            <Route path="/events">{'события'}</Route>
            <Route path="/blog">{'блог'}</Route>
            <Route component={NotFoundPage} />
          </Switch>
          <BeerWave />
        </Layout>
      </Router>
    </context.Provider>
  )
}

export default App

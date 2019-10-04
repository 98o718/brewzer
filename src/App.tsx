import React from 'react'
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import emotionNormalize from 'emotion-normalize'
import 'bootstrap/dist/css/bootstrap.css'

import {
  Layout,
  BeerWave,
  Header,
  RecipesContainer,
  RecipeContainer,
} from './components'

const App: React.FC = () => {
  return (
    <Router>
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
        `}
      />

      <Layout>
        <Header />
        <Switch>
          <Route exact path="/(|recipes)" component={RecipesContainer} />
          <Route path="/recipes/:id" component={RecipeContainer} />
          <Route path="/events">{'события'}</Route>
          <Route path="/blog">{'блог'}</Route>
        </Switch>
        <BeerWave />
      </Layout>
    </Router>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useAtom } from '@reatom/react'

import { Header, PrivateRoute } from './components'
import {
  SignUpPage,
  SignInPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  MyRecipesPage,
  AddRecipePage,
  AddBrewPage,
  RecipesPage,
  MyBrewsPage,
  EditBrewPage,
  EditRecipePage,
  RecipePage,
  CopyRecipePage,
  PrivateRecipePage,
  UserPage,
} from './pages'
import { userAtom } from './model'

export const Router = () => {
  const user = useAtom(userAtom)

  const [isAuthenticated, setAuthenticated] = useState(user !== null)

  useEffect(() => {
    setAuthenticated(user !== null)
  }, [user, isAuthenticated])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/forget-password" component={ForgetPasswordPage} />
        <Route
          path="/reset-password/:username/:token"
          component={ResetPasswordPage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/my-brews"
          component={MyBrewsPage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/my-recipes"
          component={MyRecipesPage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/add-recipe"
          component={AddRecipePage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/edit-recipe/:id"
          component={EditRecipePage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/copy-recipe/:id"
          component={CopyRecipePage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/add-brew/:id/:volume?"
          component={AddBrewPage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/edit-brew/:id"
          component={EditBrewPage}
        />
        <Route exact path="/(|recipes)" component={RecipesPage} />
        <Route path="/recipes/private/:url" component={PrivateRecipePage} />
        <Route path="/recipes/:id" component={RecipePage} />
        <Route path="/user/:username" component={UserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

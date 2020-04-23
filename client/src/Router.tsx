import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
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
  UserPage,
  SettingsPage,
  FavoriteRecipesPage,
  IbuPage,
  AbvPage,
  SearchPage,
} from './pages'
import { userAtom } from './model'
import Cookies from 'universal-cookie'

export const Router = () => {
  const user = useAtom(userAtom)
  const token = new Cookies().get('accessToken')

  const isAuthenticated = user !== null && !!token

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
          path="/favorites"
          component={FavoriteRecipesPage}
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
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/settings"
          component={SettingsPage}
        />
        <Route exact path="/(|recipes)" component={RecipesPage} />
        <Route path="/recipes/:id" component={RecipePage} />
        <Route path="/calculators/ibu" component={IbuPage} />
        <Route path="/calculators/abv" component={AbvPage} />
        <Route path="/user/:username" component={UserPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

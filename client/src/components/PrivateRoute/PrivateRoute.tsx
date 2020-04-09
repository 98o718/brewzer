import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean
  redirectTo?: string
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: PrivateRouteProps) => {
  return (
    <Route
      {...otherProps}
      render={props =>
        isAuthenticated ? (
          Component && <Component {...props} />
        ) : (
          <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/'} />
        )
      }
    />
  )
}

export default PrivateRoute

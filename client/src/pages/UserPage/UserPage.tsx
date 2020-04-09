import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useFetch } from '../../hooks'
import { RecipesList } from '../../components'
import { RecipeDescription } from '../../types'

type UserPageProps = {
  readonly username: string
}

const UserPage = ({ match }: RouteComponentProps<UserPageProps>) => {
  const [recipes] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_USER_RECIPES_URL!,
    match.params.username,
  )

  return (
    <RecipesList
      heading={`Рецепты ${match.params.username}`}
      recipes={recipes}
      showRating
    />
  )
}

export default UserPage

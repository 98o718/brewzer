import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { useFetch, useOnlineDetector } from '../../hooks'
import { RecipesList } from '../../components'
import { RecipeDescription } from '../../types'
import { toast } from 'react-toastify'
import { useFilter } from '../../hooks/useFilter'
import Filter from '../../components/Filter'

type UserPageProps = {
  readonly username: string
}

const UserPage = ({ match }: RouteComponentProps<UserPageProps>) => {
  const [recipes, , error] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_USER_RECIPES_URL!,
    match.params.username,
  )

  const { filtered, ...filterProps } = useFilter<RecipeDescription>(
    recipes,
    'title',
  )

  const { isOnline } = useOnlineDetector()

  if (error) {
    toast.error(isOnline ? 'Ничего не найдено!' : 'Необходим интернет!')

    return <Redirect to="/" />
  }

  return (
    <>
      {recipes && recipes.length !== 0 && <Filter {...filterProps} />}
      <RecipesList
        width="500px"
        heading={`Рецепты ${match.params.username}`}
        recipes={filtered}
        showRating
      />
    </>
  )
}

export default UserPage

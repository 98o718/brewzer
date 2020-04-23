import React from 'react'
import { Redirect } from 'react-router-dom'

import { useFetch } from '../../hooks'
import { RecipesList } from '../../components'
import { RecipeDescription } from '../../types'
import { toast } from 'react-toastify'
import { useFilter } from '../../hooks/useFilter'
import Filter from '../../components/Filter'

const FavoriteRecipesPage = () => {
  const [recipes, , error] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_FAVORITE_RECIPES_URL!,
  )

  const { filtered, ...filterProps } = useFilter<RecipeDescription>(
    recipes,
    'title',
  )

  if (error) {
    toast.error('Ошибка загрузки!')

    return <Redirect to="/" />
  }

  return (
    <>
      {recipes && recipes.length !== 0 && <Filter {...filterProps} />}
      <RecipesList
        width="500px"
        heading={`Избранные рецепты`}
        recipes={filtered}
        showRating
      />
    </>
  )
}

export default FavoriteRecipesPage

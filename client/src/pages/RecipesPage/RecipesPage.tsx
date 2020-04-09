import React from 'react'

import { RecipesPageWrapper } from './RecipesPage.styles'
import { RecipesList } from '../../components'
import { RecipeDescription } from '../../types'
import { useFetch } from '../../hooks'

const RecipesPage: React.FC = () => {
  const [newRecipes] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_NEW_RECIPES_URL!,
  )
  const [popularRecipes] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_POPULAR_RECIPES_URL!,
  )

  return (
    <RecipesPageWrapper>
      <RecipesList heading="Новые" recipes={newRecipes} />
      <RecipesList heading="Популярные" recipes={popularRecipes} showRating />
    </RecipesPageWrapper>
  )
}

export default RecipesPage

import React, { useEffect, useState } from 'react'
import { RecipesContainerWrapper } from './RecipesContainer.styles'
import { RecipesList } from '../'

import constants from '../../constants'

const RecipesContainer: React.FC = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch(constants.RECIPES_URL)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setRecipes(json)
      })
  }, [])

  return (
    <RecipesContainerWrapper>
      <RecipesList heading="Новые рецепты" recipes={recipes} />
      <RecipesList heading="Популярные рецепты" recipes={recipes} />
    </RecipesContainerWrapper>
  )
}

export default RecipesContainer

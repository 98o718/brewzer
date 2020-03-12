import React, { useEffect, useState } from 'react'
import { RecipeContainerWrapper } from './RecipeContainer.styles'
import { RouteComponentProps } from 'react-router-dom'
import { RecipeChart } from '../'
import constants from '../../constants'
import { RecipeDescription } from '../../types'

type RecipeContainerProps = {
  readonly id: string
}

const RecipeContainer = (props: RouteComponentProps<RecipeContainerProps>) => {
  const [recipe, setRecipe] = useState<RecipeDescription>()
  useEffect(() => {
    fetch(constants.RECIPES_URL + `/${props.match.params.id}`)
      .then(response => response.json())
      .then(json => {
        setRecipe(json)
      })
  }, [props.match.params.id])

  return (
    <RecipeContainerWrapper>
      {recipe && recipe.title}
      <RecipeChart />
    </RecipeContainerWrapper>
  )
}
export default RecipeContainer

import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useRecipePanel, useFetch } from '../../hooks'
import { Recipe, RecipePanel, NoPrint } from '../../components'
import { RecipeDescription } from '../../types'

type RecipePageProps = {
  readonly id: string
}

const RecipePage = ({ match }: RouteComponentProps<RecipePageProps>) => {
  const [recipe, loading, handleLoad] = useFetch<RecipeDescription>(
    process.env.REACT_APP_RECIPES_URL!,
    match.params.id,
  )
  const { multiplier, ...recipePanelProps } = useRecipePanel(recipe, handleLoad)

  return (
    <>
      <NoPrint>
        <RecipePanel {...recipePanelProps} loading={loading} />
      </NoPrint>
      <Recipe recipe={recipe} loading={loading} multiplier={multiplier} />
    </>
  )
}

export default RecipePage

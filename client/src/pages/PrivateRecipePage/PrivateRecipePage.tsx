import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useRecipePanel, useFetch } from '../../hooks'
import { Recipe, RecipePanel, NoPrint } from '../../components'
import { RecipeDescription } from '../../types'

type PrivateRecipePageProps = {
  readonly url: string
}

const PrivateRecipePage = ({
  match,
}: RouteComponentProps<PrivateRecipePageProps>) => {
  const [recipe, loading, handleLoad] = useFetch<RecipeDescription>(
    process.env.REACT_APP_PRIVATE_RECIPES_URL!,
    match.params.url,
  )
  const { multiplier, ...recipePanelProps } = useRecipePanel(recipe, handleLoad)

  return (
    <>
      <NoPrint>
        <RecipePanel {...recipePanelProps} />
      </NoPrint>
      <Recipe recipe={recipe} loading={loading} multiplier={multiplier} />
    </>
  )
}

export default PrivateRecipePage

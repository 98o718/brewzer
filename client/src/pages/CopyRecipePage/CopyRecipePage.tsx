import React from 'react'

import { useRecipeForm, RecipeFormType } from '../../hooks'
import { RecipeForm } from '../../components'
import { RouteComponentProps } from 'react-router-dom'

type CopyRecipePageProps = {
  id: string
}

const CopyRecipePage = ({
  match,
}: RouteComponentProps<CopyRecipePageProps>) => {
  const recipeFormProps = useRecipeForm(match.params.id, RecipeFormType.COPY)

  return <RecipeForm {...recipeFormProps} />
}

export default CopyRecipePage

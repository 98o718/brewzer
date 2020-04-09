import React from 'react'

import { useRecipeForm, RecipeFormType } from '../../hooks'
import { RecipeForm } from '../../components'
import { RouteComponentProps } from 'react-router-dom'

type EditRecipePageProps = {
  id: string
}

const EditRecipePage = ({
  match,
}: RouteComponentProps<EditRecipePageProps>) => {
  const recipeFormProps = useRecipeForm(match.params.id, RecipeFormType.EDIT)

  return <RecipeForm {...recipeFormProps} />
}

export default EditRecipePage

import React from 'react'

import { useRecipeForm } from '../../hooks'
import { RecipeForm } from '../../components'

const AddRecipePage: React.FC = () => {
  const recipeFormProps = useRecipeForm()

  return <RecipeForm {...recipeFormProps} />
}

export default AddRecipePage

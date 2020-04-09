import React from 'react'
import { useAtom } from '@reatom/react'

import { RecipesList, MyRecipesPanel } from '../../components'
import { userAtom } from '../../model'
import { RecipeDescription } from '../../types'
import { useOnlineDetector } from '../../hooks'
import { useFetch, useMyRecipes } from '../../hooks'

const MyRecipesPage: React.FC = () => {
  const user = useAtom(userAtom)
  const { isOnline } = useOnlineDetector()
  const [recipes, , handleLoad] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_USER_RECIPES_URL!,
    user!.username,
  )
  const { handleEdit, handleDelete } = useMyRecipes(handleLoad)

  return (
    <>
      {isOnline && <MyRecipesPanel />}
      <RecipesList
        width="500px"
        heading="Ваши рецепты"
        recipes={recipes}
        showButtons={isOnline}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default MyRecipesPage

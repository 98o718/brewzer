import React from 'react'
import { useAtom } from '@reatom/react'

import { RecipesList, MyRecipesPanel, Filter } from '../../components'
import { userAtom } from '../../model'
import { RecipeDescription } from '../../types'
import { useOnlineDetector } from '../../hooks'
import { useFetch, useMyRecipes } from '../../hooks'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { useFilter } from '../../hooks/useFilter'

const MyRecipesPage: React.FC = () => {
  const user = useAtom(userAtom)
  const { isOnline } = useOnlineDetector()
  const [recipes, , error, handleLoad] = useFetch<RecipeDescription[]>(
    process.env.REACT_APP_USER_RECIPES_URL!,
    user!.username,
  )
  const { handleEdit, handleDelete } = useMyRecipes(handleLoad)

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
      {isOnline && <MyRecipesPanel />}
      {recipes && recipes.length !== 0 && <Filter {...filterProps} />}
      <RecipesList
        width="500px"
        heading="Ваши рецепты"
        recipes={filtered}
        showButtons={isOnline}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default MyRecipesPage

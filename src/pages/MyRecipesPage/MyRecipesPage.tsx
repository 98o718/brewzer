import React, { useEffect, useState } from 'react'
import { MyRecipesPageWrapper } from './MyRecipesPage.styles'
import { RecipesList } from '../../components'
import constants from '../../constants'
import { useAtom } from '@reatom/react'
import { usernameAtom } from '../../atoms/auth.atoms'
import { fetchRefresh } from '../../utils'
import { RecipeDescription } from '../../types'

const MyRecipesPage: React.FC = () => {
  const username = useAtom(usernameAtom)
  const [recipes, setRecipes] = useState<RecipeDescription[] | null>(null)

  useEffect(() => {
    fetchRefresh(constants.USERS_RECIPES_URL + username).then(res => {
      console.log(res.data)
      setRecipes(res.data)
    })
  }, [username])

  return (
    <MyRecipesPageWrapper>
      {recipes !== null &&
        (recipes.length === 0 ? (
          'У вас нет рецептов'
        ) : (
          <RecipesList heading="Ваши рецепты" recipes={recipes} />
        ))}
    </MyRecipesPageWrapper>
  )
}

export default MyRecipesPage

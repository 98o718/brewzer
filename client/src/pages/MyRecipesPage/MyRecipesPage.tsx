import React, { useEffect, useState } from 'react'
import { MyRecipesPageWrapper } from './MyRecipesPage.styles'
import { RecipesList, MyRecipesPanel } from '../../components'
import constants from '../../constants'
import { useAtom } from '@reatom/react'
import { userAtom } from '../../model'
import { fetchRefresh } from '../../utils'
import { RecipeDescription } from '../../types'
import { useHistory } from 'react-router-dom'

const MyRecipesPage: React.FC = () => {
  const history = useHistory()
  const user = useAtom(userAtom)
  const [recipes, setRecipes] = useState<RecipeDescription[] | null>(null)

  useEffect(() => {
    if (user === null) {
      history.push('/')
    } else {
      fetchRefresh(constants.USERS_RECIPES_URL + user.username).then(res => {
        console.log(res.data)
        setRecipes(res.data)
      })
    }
  }, [user])

  return (
    <MyRecipesPageWrapper>
      <MyRecipesPanel />
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

import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import {
  useRecipePanel,
  useFetch,
  useOnlineDetector,
  useComments,
} from '../../hooks'
import { Recipe, RecipePanel, NoPrint, Comments } from '../../components'
import { RecipeDescription } from '../../types'
import { toast } from 'react-toastify'

type RecipePageProps = {
  readonly id: string
}

const RecipePage = ({ match }: RouteComponentProps<RecipePageProps>) => {
  const [recipe, loading, error, handleLoad] = useFetch<RecipeDescription>(
    process.env.REACT_APP_RECIPES_URL!,
    match.params.id,
  )
  const { multiplier, ...recipePanelProps } = useRecipePanel(recipe, handleLoad)
  const commentsProps = useComments(match.params.id)
  const { isOnline } = useOnlineDetector()

  if (error) {
    toast.error('Ошибка загрузки')

    return <Redirect to="/" />
  }

  return (
    <>
      <NoPrint>
        <RecipePanel
          isOnline={isOnline}
          {...recipePanelProps}
          loading={loading}
          favorite={recipe ? recipe.favorites : false}
          id={recipe ? recipe.id : undefined}
          type={recipe ? recipe.recipeType : undefined}
          access={recipe ? recipe.access : undefined}
        />
      </NoPrint>
      <Recipe recipe={recipe} loading={loading} multiplier={multiplier} />
      {isOnline && (
        <NoPrint>
          <Comments
            author={recipe ? recipe.author : undefined}
            hidden={loading}
            {...commentsProps}
          />
        </NoPrint>
      )}
    </>
  )
}

export default RecipePage

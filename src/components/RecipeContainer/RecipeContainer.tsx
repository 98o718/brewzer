import React from 'react'
import { RecipeContainerWrapper } from './RecipeContainer.styles'
import { RouteComponentProps } from 'react-router-dom'

type RecipeContainerProps = {
  readonly id: string
}

const RecipeContainer = (props: RouteComponentProps<RecipeContainerProps>) => (
  <RecipeContainerWrapper>{props.match.params.id}</RecipeContainerWrapper>
)

export default RecipeContainer

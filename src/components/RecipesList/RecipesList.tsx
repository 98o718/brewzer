import React from 'react'
import { RecipesListWrapper, Recipe } from './RecipesList.styles'

import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

type RecipeDescription = {
  readonly id: string
  readonly title: string
  readonly author: string
  readonly abv: number
  readonly ibu: number
  readonly np: number
  readonly kp: number
  readonly time: string
}

type RecipesListProps = {
  heading: string
  recipes: RecipeDescription[]
}

const RecipesList = (props: RecipesListProps) => (
  <RecipesListWrapper type={isMobile ? 'true' : undefined}>
    <h2>{props.heading}</h2>
    <ListGroup>
      {props.recipes.map((recipe, index) => (
        <ListGroupItem tag={Recipe} key={index}>
          <span>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link> от{' '}
            <Link to={`/users/${recipe.author}`}>{recipe.author}</Link>{' '}
            {recipe.time}
          </span>
          <span>
            АЛК <b>{recipe.abv}</b> IBU <b>{recipe.ibu}</b> НП{' '}
            <b>{recipe.np}</b> КП <b>{recipe.kp}</b>
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  </RecipesListWrapper>
)

export default RecipesList

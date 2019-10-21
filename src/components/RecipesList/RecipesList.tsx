import React from 'react'
import { RecipesListWrapper, Recipe } from './RecipesList.styles'

import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { RecipeDescription } from '../../types'

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
            {recipe.abv && (
              <>
                АЛК <b>{recipe.abv}</b>{' '}
              </>
            )}
            {recipe.ibu && (
              <>
                IBU <b>{recipe.ibu}</b>{' '}
              </>
            )}
            {recipe.og && (
              <>
                НП <b>{recipe.og}</b>{' '}
              </>
            )}
            {recipe.fg && (
              <>
                КП <b>{recipe.fg}</b>
              </>
            )}
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  </RecipesListWrapper>
)

export default RecipesList

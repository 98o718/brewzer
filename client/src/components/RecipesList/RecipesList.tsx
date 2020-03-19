import React from 'react'
import {
  RecipesListWrapper,
  Recipe,
  Lock,
  RecipeInfoWrapper,
  RecipeRightPanel,
} from './RecipesList.styles'

import { ListGroup, ListGroupItem, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { RecipeDescription, RecipeType, RecipeAccessType } from '../../types'

type RecipesListProps = {
  heading: string
  recipes: RecipeDescription[]
}

const RecipesList = (props: RecipesListProps) => (
  <RecipesListWrapper type={isMobile ? 'true' : undefined}>
    <h2>{props.heading}</h2>
    <ListGroup>
      {props.recipes.map((recipe, index) => (
        <ListGroupItem
          tag={Recipe}
          key={index}
          className="d-flex flex-row justify-content-between"
        >
          <RecipeInfoWrapper>
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
          </RecipeInfoWrapper>
          {recipe.recipeType === RecipeType.PRIVATE && (
            <RecipeRightPanel>
              <Lock
                id={`recipe-type-${index}`}
                role="img"
                aria-label="lock emoji"
              >
                {recipe.access === RecipeAccessType.USER_ONLY ? '🔒' : '🔗'}
              </Lock>
              <UncontrolledTooltip
                placement="bottom"
                target={`recipe-type-${index}`}
              >
                {recipe.access === RecipeAccessType.USER_ONLY
                  ? 'Доступен только Вам'
                  : 'Доступ по ссылке'}
              </UncontrolledTooltip>
            </RecipeRightPanel>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  </RecipesListWrapper>
)

export default RecipesList

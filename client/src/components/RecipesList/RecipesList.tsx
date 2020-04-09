import React from 'react'
import {
  RecipesListWrapper,
  Recipe,
  Lock,
  RecipeInfoWrapper,
  RecipeRightPanel,
  ButtonsWrapper,
  IconButton,
} from './RecipesList.styles'

import {
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useAtom } from '@reatom/react'
import { userAtom } from '../../model'

import { RecipeDescription, RecipeType, RecipeAccessType } from '../../types'
import { BarLoader } from 'react-spinners'

type RecipesListProps = {
  heading?: string
  showButtons?: boolean
  showRating?: boolean
  width?: string
  recipes: RecipeDescription[] | undefined
  handleEdit?: (id: string) => void
  handleDelete?: (id: string) => void
}

const RecipesList = ({
  heading,
  showButtons,
  showRating,
  handleEdit,
  recipes,
  handleDelete,
  width,
}: RecipesListProps) => {
  const user = useAtom(userAtom)

  return (
    <RecipesListWrapper style={{ width }} type={isMobile ? 'true' : undefined}>
      {heading && <h2>{heading}</h2>}
      <ListGroup>
        {!recipes ? (
          <BarLoader width="100%" />
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <ListGroupItem
              tag={Recipe}
              key={index}
              className="d-flex flex-row justify-content-between"
            >
              <RecipeInfoWrapper>
                <span>
                  <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>{' '}
                  от&nbsp;
                  <Link to={`/user/${recipe.author}`}>{recipe.author}</Link>
                  {recipe.forked !== undefined &&
                    recipe.forked !== recipe.author && (
                      <>
                        &nbsp;/&nbsp;
                        <Link to={`/user/${recipe.forked}`}>
                          {recipe.forked}
                        </Link>
                      </>
                    )}
                </span>
                <span>
                  {!!showRating && !!recipe.rating && (
                    <>
                      <span style={{ color: '#fec802' }}>★</span>&nbsp;
                      <b>{recipe.rating}</b>{' '}
                    </>
                  )}
                  {recipe.abv && (
                    <>
                      АЛК&nbsp;<b>{recipe.abv}</b>{' '}
                    </>
                  )}
                  {recipe.ibu && (
                    <>
                      IBU&nbsp;<b>{recipe.ibu}</b>{' '}
                    </>
                  )}
                  {recipe.og && (
                    <>
                      НП&nbsp;<b>{recipe.og}</b>{' '}
                    </>
                  )}
                  {recipe.fg && (
                    <>
                      КП&nbsp;<b>{recipe.fg}</b>
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
              {showButtons && handleEdit && handleDelete && (
                <ButtonsWrapper>
                  <Button
                    outline
                    color="warning"
                    tag={Link}
                    to={`/add-brew/${recipe.id}`}
                  >
                    Сварить
                  </Button>
                  {user !== null && user.sub === recipe.userId && (
                    <>
                      <IconButton onClick={handleEdit.bind(null, recipe.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                      <IconButton
                        color="red"
                        onClick={handleDelete.bind(null, recipe.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </IconButton>
                    </>
                  )}
                </ButtonsWrapper>
              )}
            </ListGroupItem>
          ))
        ) : (
          'Нет рецептов'
        )}
      </ListGroup>
    </RecipesListWrapper>
  )
}

export default RecipesList

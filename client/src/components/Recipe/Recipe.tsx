import React from 'react'
import { BarLoader } from 'react-spinners'
import {
  CardBody,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
  UncontrolledTooltip,
} from 'reactstrap'
import {
  RecipeWrapper,
  BoldCardText,
  Card,
  ItemWrapper,
  ItemName,
  RecipeInfoWrapper,
  CardsWrapper,
  DescriptionWrapper,
  TypeIcon,
} from './Recipe.styles'
import {
  RecipeDescription,
  RecipeAccessType,
  RecipeType,
  WhenOther,
} from '../../types'
import { Link } from 'react-router-dom'

type RecipeProps = {
  recipe: RecipeDescription | undefined
  loading: boolean
  multiplier?: number
}

const Recipe = ({ recipe, loading, multiplier = 1 }: RecipeProps) => {
  return (
    <RecipeWrapper>
      {loading || !recipe ? (
        <BarLoader width="50vw" />
      ) : (
        <>
          <h1 style={{ textAlign: 'center', marginTop: 0 }}>
            {recipe.title}
            {recipe.recipeType !== RecipeType.PUBLIC && (
              <>
                <TypeIcon id="recipe-type" role="img" aria-label="recipe type">
                  {recipe.access === RecipeAccessType.USER_ONLY ? '🔒' : '🔗'}
                </TypeIcon>
                <UncontrolledTooltip placement="bottom" target={`recipe-type`}>
                  {recipe.access === RecipeAccessType.USER_ONLY
                    ? 'Доступен только Вам'
                    : 'Доступ по ссылке'}
                </UncontrolledTooltip>
              </>
            )}
          </h1>
          <h5 style={{ marginBottom: 15 }}>
            от&nbsp;
            <Link to={`/user/${recipe.author}`}>{recipe.author}</Link>
            {recipe.forked !== undefined && recipe.forked !== recipe.author && (
              <>
                &nbsp;/&nbsp;
                <Link to={`/user/${recipe.forked}`}>{recipe.forked}</Link>
              </>
            )}
            {!!recipe.rating && (
              <span style={{ marginLeft: 10 }}>
                <span style={{ color: '#fec802' }}>★</span>
                <b> {recipe.rating}</b>
              </span>
            )}
          </h5>

          <DescriptionWrapper>
            {(recipe.description || recipe.details || recipe.style) && (
              <Card>
                <CardBody>
                  {recipe.description && (
                    <>
                      <CardSubtitle>
                        <b>Описание</b>
                      </CardSubtitle>
                      <CardText>{recipe.description}</CardText>
                    </>
                  )}
                  {recipe.details && (
                    <>
                      <CardSubtitle>
                        <b>Детали</b>
                      </CardSubtitle>
                      <CardText>{recipe.details}</CardText>
                    </>
                  )}
                  {recipe.style && (
                    <>
                      <CardSubtitle>
                        <b>Cтиль</b>
                      </CardSubtitle>
                      <CardText>{recipe.style}</CardText>
                    </>
                  )}
                </CardBody>
              </Card>
            )}

            <Card>
              <RecipeInfoWrapper>
                <span>
                  <CardSubtitle>Заторная вода</CardSubtitle>
                  <BoldCardText>
                    {+(recipe.mashWater * multiplier).toFixed(2)} л
                  </BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Промывная вода</CardSubtitle>
                  <BoldCardText>
                    {+(recipe.flushingWater * multiplier).toFixed(2)} л
                  </BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Объем до кипячения</CardSubtitle>
                  <BoldCardText>
                    {+(recipe.batchVolume * multiplier).toFixed(2)} л
                  </BoldCardText>
                </span>
                <span>
                  <CardSubtitle>После кипячения</CardSubtitle>
                  <BoldCardText>
                    {+(recipe.volume * multiplier).toFixed(2)} л
                  </BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Крепость</CardSubtitle>
                  <BoldCardText>{recipe.abv}°</BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Горечь</CardSubtitle>
                  <BoldCardText>{recipe.ibu} IBU</BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Начальная плотность</CardSubtitle>
                  <BoldCardText>{recipe.og}%</BoldCardText>
                </span>
                <span>
                  <CardSubtitle>Конечная плотность</CardSubtitle>
                  <BoldCardText>{recipe.fg}%</BoldCardText>
                </span>
              </RecipeInfoWrapper>
            </Card>
          </DescriptionWrapper>

          <CardsWrapper>
            <Card>
              <CardBody>
                <h6>Зерновые</h6>
                <ListGroup>
                  {recipe.ingredients.grains.map((grain, idx) => {
                    return (
                      <ListGroupItem
                        key={idx}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <ItemWrapper>
                          <ItemName>{grain.name}</ItemName>
                          <Badge pill>
                            {+(grain.weight * multiplier).toFixed(2)} кг
                          </Badge>
                        </ItemWrapper>
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h6>Температурные паузы</h6>
                <ListGroup>
                  {recipe.pauses.map((pause, idx) => {
                    return (
                      <ListGroupItem
                        key={idx}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <ItemWrapper>
                          <ItemName>{pause.temp}°C</ItemName>
                          <Badge color="primary" pill>
                            {pause.time} мин
                          </Badge>
                        </ItemWrapper>
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h6>Хмель</h6>
                <ListGroup>
                  {recipe.ingredients.hops.map((hop, idx) => {
                    return (
                      <ListGroupItem
                        key={idx}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <ItemWrapper>
                          <ItemName>{hop.name}</ItemName>
                          <Badge pill>
                            {+(hop.weight * multiplier).toFixed(2)} г
                          </Badge>
                          <Badge color="success" pill>
                            {hop.alpha} %
                          </Badge>
                          <Badge color="primary" pill>
                            {hop.time} мин
                          </Badge>
                        </ItemWrapper>
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </CardBody>
            </Card>

            {!!recipe.ingredients.dryHops.length && (
              <Card>
                <CardBody>
                  <h6>Сухое охмеление</h6>
                  <ListGroup>
                    {recipe.ingredients.dryHops.map((hop, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{hop.name}</ItemName>
                            <Badge pill>
                              {+(+hop.weight * multiplier).toFixed(2)} г
                            </Badge>
                            <Badge color="success" pill>
                              {hop.when}
                            </Badge>
                            {!!hop.time && (
                              <Badge color="primary" pill>
                                {hop.time} д
                              </Badge>
                            )}
                          </ItemWrapper>
                        </ListGroupItem>
                      )
                    })}
                  </ListGroup>
                </CardBody>
              </Card>
            )}

            {!!recipe.ingredients.others.length && (
              <Card>
                <CardBody>
                  <h6>Другое</h6>
                  <ListGroup>
                    {recipe.ingredients.others.map((other, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{other.name}</ItemName>
                            <Badge pill>
                              {+(+other.weight * multiplier).toFixed(2)} г
                            </Badge>
                            <Badge color="success" pill>
                              {other.when}
                            </Badge>
                            {!!other.time && (
                              <Badge color="primary" pill>
                                {other.time}{' '}
                                {other.when === WhenOther.BOILER ? 'мин' : 'д'}
                              </Badge>
                            )}
                          </ItemWrapper>
                        </ListGroupItem>
                      )
                    })}
                  </ListGroup>
                </CardBody>
              </Card>
            )}

            <Card>
              <CardBody>
                <h6>Дрожжи</h6>
                <ListGroup>
                  <ListGroupItem className="d-flex align-items-center justify-content-between">
                    <ItemWrapper>
                      <ItemName>{recipe.ingredients.yeast.name}</ItemName>
                      <Badge pill>
                        {
                          +(
                            recipe.ingredients.yeast.weight * multiplier
                          ).toFixed(2)
                        }{' '}
                        г
                      </Badge>
                      <Badge color="info" pill>
                        {recipe.ingredients.yeast.temp} °C
                      </Badge>
                    </ItemWrapper>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </CardsWrapper>
        </>
      )}
    </RecipeWrapper>
  )
}

export default Recipe

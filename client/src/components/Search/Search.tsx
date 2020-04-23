import React from 'react'
import { SearchWrapper } from './Search.styles'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  CustomInput,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'
import { ItemWrapper, ItemName } from '../Recipe/Recipe.styles'
import { ListButton } from '../RecipeForm/RecipeForm.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { RecipeDescription, PaginateResult } from '../../types'
import { RecipesList } from '..'

type SearchPropsType = {
  recipes: PaginateResult<RecipeDescription> | undefined
  page: number
  info: {
    title: string
    style: string
    rating: string
    sort: string
    abv: number | ''
    ibu: number | ''
    og: number | ''
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  grains: string[]
  grainRef: React.RefObject<HTMLInputElement>
  addGrain: () => void
  deleteGrain: (idx: number) => void
  exactGrains: boolean
  handleExactGrains: () => void
  hops: string[]
  hopRef: React.RefObject<HTMLInputElement>
  addHop: () => void
  deleteHop: (idx: number) => void
  exactHops: boolean
  handleExactHops: () => void
  others: string[]
  otherRef: React.RefObject<HTMLInputElement>
  addOther: () => void
  deleteOther: (idx: number) => void
  exactOthers: boolean
  handleExactOthers: () => void
  yeasts: string[]
  yeastRef: React.RefObject<HTMLInputElement>
  addYeast: () => void
  deleteYeast: (idx: number) => void
  handleSubmit: (p?: number) => void
  loading: boolean
  headingRef: React.RefObject<HTMLHeadingElement>
}

const Search = ({
  recipes,
  page,
  info: { title, style, rating, abv, ibu, og, sort },
  handleChange,
  grains,
  grainRef,
  addGrain,
  deleteGrain,
  exactGrains,
  handleExactGrains,
  hops,
  hopRef,
  addHop,
  deleteHop,
  exactHops,
  handleExactHops,
  others,
  otherRef,
  addOther,
  deleteOther,
  exactOthers,
  handleExactOthers,
  yeasts,
  yeastRef,
  addYeast,
  deleteYeast,
  handleSubmit,
  loading,
  headingRef,
}: SearchPropsType) => {
  return (
    <SearchWrapper>
      <Form>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="title">Название</Label>
              <Input
                name="title"
                id="title"
                type="text"
                value={title}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="style">Стиль</Label>
              <Input
                name="style"
                id="style"
                type="text"
                value={style}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="rating">Рейтинг</Label>
              <Input
                type="select"
                name="rating"
                id="rating"
                value={rating}
                onChange={handleChange}
              >
                <option value="0">Не важно</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="abv">Крепость</Label>
              <Input
                name="abv"
                id="abv"
                type="number"
                min={0}
                placeholder="°"
                value={abv}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="ibu">Горечь</Label>
              <Input
                name="ibu"
                id="ibu"
                type="number"
                min={0}
                placeholder="IBU"
                value={ibu}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="og">Плотность</Label>
              <Input
                name="og"
                id="og"
                type="number"
                min={0}
                placeholder="%"
                value={og}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="sort">Сортировать</Label>
              <Input
                type="select"
                name="sort"
                id="sort"
                value={sort}
                onChange={handleChange}
              >
                <option value="-rating">По рейтингу</option>
                <option value="title">По названию</option>
                <option value="-created_at">Сначала новые</option>
                <option value="created_at">Сначала старые</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Card
        className="mb-3"
        onKeyDown={(e: React.KeyboardEvent) => {
          e.key === 'Enter' && addGrain()
        }}
      >
        <CardBody>
          <h6>Зерновые</h6>
          <CustomInput
            className="mb-2"
            type="switch"
            id="exactGrains"
            name="exactGrains"
            label="Все одновременно"
            checked={exactGrains}
            onChange={handleExactGrains}
          />
          {!!grains.length && (
            <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
              {grains.map((grain, idx) => {
                return (
                  <ListGroupItem
                    key={grain + idx}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ItemWrapper>
                      <ItemName>{grain}</ItemName>
                    </ItemWrapper>
                    <span>
                      <ListButton
                        type="button"
                        onClick={() => deleteGrain(idx)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </ListButton>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          )}
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  spellCheck={false}
                  name="grainName"
                  id="grainName"
                  placeholder="Название"
                  innerRef={grainRef}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                style={{ width: '100%' }}
                color="primary"
                onClick={addGrain}
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card
        className="mb-3"
        onKeyDown={(e: React.KeyboardEvent) => {
          e.key === 'Enter' && addHop()
        }}
      >
        <CardBody>
          <h6>Хмель</h6>
          <CustomInput
            className="mb-2"
            type="switch"
            id="exactHops"
            name="exactHops"
            label="Все одновременно"
            checked={exactHops}
            onChange={handleExactHops}
          />
          {!!hops.length && (
            <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
              {hops.map((hop, idx) => {
                return (
                  <ListGroupItem
                    key={hop + idx}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ItemWrapper>
                      <ItemName>{hop}</ItemName>
                    </ItemWrapper>
                    <span>
                      <ListButton type="button" onClick={() => deleteHop(idx)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </ListButton>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          )}
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  spellCheck={false}
                  name="hopName"
                  id="hopName"
                  placeholder="Название"
                  innerRef={hopRef}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                style={{ width: '100%' }}
                color="primary"
                onClick={addHop}
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card
        className="mb-3"
        onKeyDown={(e: React.KeyboardEvent) => {
          e.key === 'Enter' && addOther()
        }}
      >
        <CardBody>
          <h6>Другое</h6>
          <CustomInput
            className="mb-2"
            type="switch"
            id="exactOthers"
            name="exactOthers"
            label="Все одновременно"
            checked={exactOthers}
            onChange={handleExactOthers}
          />
          {!!others.length && (
            <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
              {others.map((other, idx) => {
                return (
                  <ListGroupItem
                    key={other + idx}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ItemWrapper>
                      <ItemName>{other}</ItemName>
                    </ItemWrapper>
                    <span>
                      <ListButton
                        type="button"
                        onClick={() => deleteOther(idx)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </ListButton>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          )}
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  spellCheck={false}
                  name="otherName"
                  id="otherName"
                  placeholder="Название"
                  innerRef={otherRef}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                style={{ width: '100%' }}
                color="primary"
                onClick={addOther}
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card
        className="mb-3"
        onKeyDown={(e: React.KeyboardEvent) => {
          e.key === 'Enter' && addYeast()
        }}
      >
        <CardBody>
          <h6>Дрожжи</h6>
          {!!yeasts.length && (
            <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
              {yeasts.map((yeast, idx) => {
                return (
                  <ListGroupItem
                    key={yeast + idx}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ItemWrapper>
                      <ItemName>{yeast}</ItemName>
                    </ItemWrapper>
                    <span>
                      <ListButton
                        type="button"
                        onClick={() => deleteYeast(idx)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </ListButton>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          )}
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  spellCheck={false}
                  name="yeastName"
                  id="yeastName"
                  placeholder="Название"
                  innerRef={yeastRef}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                style={{ width: '100%' }}
                color="primary"
                onClick={addYeast}
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Button className="mb-3" color="success" onClick={() => handleSubmit(1)}>
        Найти
      </Button>
      {(loading || recipes) && (
        <RecipesList
          showRating
          heading={`Найдено рецептов: ${recipes ? recipes.totalDocs : 0}`}
          recipes={recipes && !loading ? recipes.docs : undefined}
          headingRef={headingRef}
        />
      )}
      {recipes && !!recipes.docs.length && (
        <>
          <Pagination
            aria-label="Recipes navigation"
            className="w-100 d-flex justify-content-center"
          >
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                first
                tag="button"
                onClick={() => handleSubmit(1)}
              />
            </PaginationItem>

            <PaginationItem disabled={!recipes.prevPage}>
              <PaginationLink
                previous
                tag="button"
                onClick={() => handleSubmit(recipes.prevPage || 1)}
              />
            </PaginationItem>

            <PaginationItem active>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={!recipes.nextPage}>
              <PaginationLink
                next
                tag="button"
                onClick={() => handleSubmit(recipes.nextPage || 1)}
              />
            </PaginationItem>

            <PaginationItem disabled={page === recipes.totalPages}>
              <PaginationLink
                last
                tag="button"
                onClick={() => handleSubmit(recipes.totalPages)}
              />
            </PaginationItem>
          </Pagination>
        </>
      )}
    </SearchWrapper>
  )
}

export default Search

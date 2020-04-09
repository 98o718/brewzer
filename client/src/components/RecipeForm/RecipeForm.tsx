import React, { SetStateAction } from 'react'
import {
  FormGroup,
  Input,
  Label,
  Button,
  CustomInput,
  Row,
  Col,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap'
import TextareaAutosize from 'react-autosize-textarea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { BarLoader } from 'react-spinners'

import {
  RecipeFormWrapper,
  AddRecipeForm,
  ListButton,
  AddRecipeCard,
  ButtonContainer,
  ButtonInner,
  ItemWrapper,
  ItemName,
} from './RecipeForm.styles'
import {
  RecipeType,
  Recipe,
  Yeast,
  RecipeAccessType,
  WhenDryHop,
  Grain,
  Hop,
  Pause,
  DryHop,
  Other,
  WhenOther,
} from '../../types'
import { RecipeFormType } from '../../hooks'

type RecipeFormProps = {
  handleSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUrlAccess: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  calculateIbu: (hop: Hop) => number
  recipe: Recipe
  autoAbvCalc: boolean
  setAutoAbvCalc: React.Dispatch<SetStateAction<boolean>>
  setAutoIbuCalc: React.Dispatch<SetStateAction<boolean>>
  autoIbuCalc: boolean
  grains: {
    data: Grain[]
    add: () => void
    delete: (idx: number) => void
  }
  grainsRefs: {
    name: React.RefObject<HTMLInputElement>
    weight: React.RefObject<HTMLInputElement>
  }
  hops: {
    data: Hop[]
    add: () => void
    delete: (idx: number) => void
  }
  hopsRefs: {
    name: React.RefObject<HTMLInputElement>
    alpha: React.RefObject<HTMLInputElement>
    weight: React.RefObject<HTMLInputElement>
    time: React.RefObject<HTMLInputElement>
  }
  dryHops: {
    data: DryHop[]
    add: () => void
    delete: (idx: number) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    current: DryHop
  }
  dryHopsRefs: {
    name: React.RefObject<HTMLInputElement>
  }
  others: {
    data: Other[]
    add: () => void
    delete: (idx: number) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    current: Other
  }
  othersRefs: {
    name: React.RefObject<HTMLInputElement>
  }
  yeast: {
    data: Yeast | null
    add: () => void
    delete: () => void
  }
  yeastRefs: {
    name: React.RefObject<HTMLInputElement>
    weight: React.RefObject<HTMLInputElement>
    temp: React.RefObject<HTMLInputElement>
  }
  pauses: {
    data: Pause[]
    add: () => void
    delete: (idx: number) => void
  }
  pausesRefs: {
    temp: React.RefObject<HTMLInputElement>
    time: React.RefObject<HTMLInputElement>
  }
  handleSubmit: () => Promise<void>
  loading: boolean
  type: RecipeFormType
}

const RecipeForm = ({
  handleSwitch,
  calculateIbu,
  recipe,
  handleUrlAccess,
  handleChange,
  autoAbvCalc,
  setAutoAbvCalc,
  setAutoIbuCalc,
  autoIbuCalc,
  grains,
  grainsRefs,
  hops,
  hopsRefs,
  dryHops,
  dryHopsRefs,
  others,
  othersRefs,
  yeast,
  yeastRefs,
  pauses,
  pausesRefs,
  handleSubmit,
  loading,
  type,
}: RecipeFormProps) => {
  return (
    <RecipeFormWrapper>
      <h1>
        {type === RecipeFormType.EDIT
          ? 'Редактирование рецепта'
          : 'Новый рецепт'}
      </h1>
      <AddRecipeForm
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        {loading ? (
          <BarLoader width="100%" />
        ) : (
          <>
            <Row form>
              <Col>
                <FormGroup>
                  <CustomInput
                    type="switch"
                    id="type"
                    name="type"
                    label="Приватный"
                    checked={recipe.recipeType === RecipeType.PRIVATE}
                    onChange={handleSwitch}
                  />
                </FormGroup>
              </Col>
              {recipe.recipeType === RecipeType.PRIVATE && (
                <Col>
                  <FormGroup>
                    <CustomInput
                      type="checkbox"
                      id="urlAccess"
                      label="Доступ по ссылке"
                      checked={recipe.access === RecipeAccessType.URL}
                      onChange={handleUrlAccess}
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
            <FormGroup>
              <Label for="title">Название рецепта</Label>
              <Input
                type="text"
                spellCheck={false}
                name="title"
                id="title"
                onChange={handleChange}
                value={recipe.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Описание</Label>
              <Input
                type="textarea"
                spellCheck={false}
                name="description"
                tag={TextareaAutosize}
                id="description"
                onChange={handleChange}
                value={recipe.description}
              />
            </FormGroup>
            <FormGroup>
              <Label for="details">Детали</Label>
              <Input
                type="textarea"
                spellCheck={false}
                name="details"
                tag={TextareaAutosize}
                id="details"
                onChange={handleChange}
                value={recipe.details}
              />
            </FormGroup>
            <FormGroup>
              <Label for="style">Стиль</Label>
              <Input
                type="text"
                spellCheck={false}
                name="style"
                id="style"
                onChange={handleChange}
                value={recipe.style}
              />
            </FormGroup>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="mashWater">Заторная вода</Label>
                  <Input
                    type="number"
                    name="mashWater"
                    id="mashWater"
                    placeholder="В литрах"
                    min={0}
                    value={recipe.mashWater}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="flushingWater">Промывная вода</Label>
                  <Input
                    type="number"
                    name="flushingWater"
                    id="flushingWater"
                    placeholder="В литрах"
                    onChange={handleChange}
                    value={recipe.flushingWater}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="batchVolume">Объем до кипячения</Label>
                  <Input
                    type="number"
                    name="batchVolume"
                    id="batchVolume"
                    placeholder="В литрах"
                    min={0}
                    value={recipe.batchVolume}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="volume">Объем после кипячения</Label>
                  <Input
                    type="number"
                    name="volume"
                    id="volume"
                    placeholder="В литрах"
                    onChange={handleChange}
                    value={recipe.volume}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="autoAbvCalc"
                    label="Расчитать АЛК автоматически"
                    checked={autoAbvCalc}
                    onChange={() => setAutoAbvCalc(!autoAbvCalc)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="autoIbuCalc"
                    label="Расчитать IBU автоматически"
                    checked={autoIbuCalc}
                    onChange={() => setAutoIbuCalc(!autoIbuCalc)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="abv">АЛК</Label>
                  <Input
                    type="number"
                    name="abv"
                    id="abv"
                    onChange={handleChange}
                    value={recipe.abv}
                    disabled={autoAbvCalc}
                    min={0}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="og">НП</Label>
                  <Input
                    type="number"
                    name="og"
                    id="og"
                    onChange={handleChange}
                    value={recipe.og}
                    min={0}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fg">КП</Label>
                  <Input
                    type="number"
                    name="fg"
                    id="fg"
                    onChange={handleChange}
                    value={recipe.fg}
                    min={0}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="ibu">IBU</Label>
                  <Input
                    type="number"
                    name="ibu"
                    id="ibu"
                    onChange={handleChange}
                    value={recipe.ibu}
                    disabled={autoIbuCalc}
                    min={0}
                  />
                </FormGroup>
              </Col>
            </Row>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && grains.add()
              }}
            >
              <CardBody>
                <h6>Зерновые</h6>
                {!!recipe.ingredients.grains.length && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    {recipe.ingredients.grains.map((grain, idx) => {
                      return (
                        <ListGroupItem
                          key={grain.name + idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{grain.name}</ItemName>
                            <Badge pill>{grain.weight} кг</Badge>
                          </ItemWrapper>
                          <span>
                            <ListButton
                              type="button"
                              onClick={() => grains.delete(idx)}
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
                        innerRef={grainsRefs.name}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="grainWeight"
                        id="grainWeight"
                        min={0}
                        placeholder="КГ"
                        innerRef={grainsRefs.weight}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      style={{ width: '100%' }}
                      color="primary"
                      onClick={grains.add}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </AddRecipeCard>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && hops.add()
              }}
            >
              <CardBody>
                <h6>Хмель</h6>
                {!!recipe.ingredients.hops.length && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    {recipe.ingredients.hops.map((hop, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{hop.name}</ItemName>
                            <Badge pill>{hop.weight} г</Badge>
                            <Badge color="success" pill>
                              {hop.alpha} %
                            </Badge>
                            <Badge color="primary" pill>
                              {hop.time} мин
                            </Badge>
                            {autoIbuCalc && (
                              <Badge color="warning" pill>
                                {calculateIbu(hop)} IBU
                              </Badge>
                            )}
                          </ItemWrapper>
                          <span>
                            <ListButton
                              type="button"
                              onClick={() => hops.delete(idx)}
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
                        name="hopName"
                        id="hopName"
                        placeholder="Название"
                        innerRef={hopsRefs.name}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="hopAlpha"
                        id="hopAlpha"
                        min={0}
                        placeholder="Alpha Acid, %"
                        innerRef={hopsRefs.alpha}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="hopWeight"
                        id="hopWeight"
                        min={0}
                        placeholder="Г"
                        innerRef={hopsRefs.weight}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="hopTime"
                        id="hopTime"
                        min={0}
                        placeholder="Минуты"
                        innerRef={hopsRefs.time}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      style={{ width: '100%' }}
                      color="primary"
                      onClick={hops.add}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </AddRecipeCard>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && dryHops.add()
              }}
            >
              <CardBody>
                <h6>Сухое охмеление</h6>
                {!!recipe.ingredients.dryHops.length && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    {recipe.ingredients.dryHops.map((hop, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{hop.name}</ItemName>
                            <Badge pill>{hop.weight} г</Badge>
                            <Badge color="success" pill>
                              {hop.when}
                            </Badge>
                            {!!hop.time && (
                              <Badge color="primary" pill>
                                {hop.time} д
                              </Badge>
                            )}
                          </ItemWrapper>
                          <span>
                            <ListButton
                              type="button"
                              onClick={() => dryHops.delete(idx)}
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
                        name="name"
                        id="dryHopName"
                        placeholder="Название"
                        innerRef={dryHopsRefs.name}
                        value={dryHops.current.name}
                        onChange={dryHops.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="weight"
                        id="dryHopWeight"
                        min={0}
                        placeholder="Г"
                        value={dryHops.current.weight}
                        onChange={dryHops.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="when"
                        id="whenDryHop"
                        placeholder="Когда"
                        value={dryHops.current.when}
                        onChange={dryHops.handleChange}
                      >
                        <option disabled value="">
                          Когда
                        </option>
                        {Object.values(WhenDryHop).map((when, idx) => (
                          <option key={idx} value={when}>
                            {when}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {(dryHops.current.when === WhenDryHop.FIRST ||
                    dryHops.current.when === WhenDryHop.SECOND) && (
                    <Col>
                      <FormGroup>
                        <Input
                          type="number"
                          name="time"
                          id="dryHopTime"
                          min={0}
                          placeholder="Дней"
                          value={dryHops.current.time || ''}
                          onChange={dryHops.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  )}
                  <Col>
                    <Button
                      style={{ width: '100%' }}
                      color="primary"
                      onClick={dryHops.add}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </AddRecipeCard>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && yeast.add()
              }}
            >
              <CardBody>
                <h6>Дрожжи</h6>
                {recipe.ingredients.yeast !== null && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    <ListGroupItem className="d-flex align-items-center justify-content-between">
                      <ItemWrapper>
                        <ItemName>{recipe.ingredients.yeast.name}</ItemName>
                        <Badge pill>{recipe.ingredients.yeast.weight} г</Badge>
                        <Badge color="info" pill>
                          {recipe.ingredients.yeast.temp} °C
                        </Badge>
                      </ItemWrapper>
                      <span>
                        <ListButton type="button" onClick={yeast.delete}>
                          <FontAwesomeIcon icon={faTimes} />
                        </ListButton>
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                )}
                {yeast.data === null && (
                  <>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Input
                            type="text"
                            name="yeastName"
                            id="yeastName"
                            placeholder="Название"
                            innerRef={yeastRefs.name}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            type="number"
                            name="yeastWeight"
                            id="yeastWeight"
                            min={0}
                            placeholder="Г"
                            innerRef={yeastRefs.weight}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            type="number"
                            name="yeastTemp"
                            id="yeastTemp"
                            min={0}
                            placeholder="°C"
                            innerRef={yeastRefs.temp}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <Button
                          style={{ width: '100%' }}
                          color="primary"
                          onClick={yeast.add}
                        >
                          Добавить
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </AddRecipeCard>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && others.add()
              }}
            >
              <CardBody>
                <h6>Другое</h6>
                {!!recipe.ingredients.others.length && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    {recipe.ingredients.others.map((other, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <ItemWrapper>
                            <ItemName>{other.name}</ItemName>
                            <Badge pill>{other.weight} г</Badge>
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
                          <span>
                            <ListButton
                              type="button"
                              onClick={() => others.delete(idx)}
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
                        name="name"
                        id="otherName"
                        placeholder="Название"
                        innerRef={othersRefs.name}
                        value={others.current.name}
                        onChange={others.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="weight"
                        id="otherWeight"
                        min={0}
                        placeholder="Г"
                        value={others.current.weight}
                        onChange={others.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="when"
                        id="otherWhen"
                        placeholder="Когда"
                        value={others.current.when}
                        onChange={others.handleChange}
                      >
                        <option disabled value="">
                          Когда
                        </option>
                        {Object.values(WhenOther).map((when, idx) => (
                          <option key={idx} value={when}>
                            {when}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {(others.current.when === WhenOther.FIRST ||
                    others.current.when === WhenOther.SECOND) && (
                    <Col>
                      <FormGroup>
                        <Input
                          type="number"
                          name="time"
                          id="dryHopTime"
                          min={0}
                          placeholder="Дней"
                          value={others.current.time || ''}
                          onChange={others.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  )}
                  {others.current.when === WhenOther.BOILER && (
                    <Col>
                      <FormGroup>
                        <Input
                          type="number"
                          name="time"
                          id="dryHopTime"
                          min={0}
                          placeholder="Минуты"
                          value={others.current.time || ''}
                          onChange={others.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  )}
                  <Col>
                    <Button
                      style={{ width: '100%' }}
                      color="primary"
                      onClick={others.add}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </AddRecipeCard>
            <AddRecipeCard
              onKeyDown={(e: React.KeyboardEvent) => {
                e.key === 'Enter' && pauses.add()
              }}
            >
              <CardBody>
                <h6>Температурные паузы</h6>
                {!!recipe.pauses.length && (
                  <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                    {recipe.pauses.map((pause, idx) => {
                      return (
                        <ListGroupItem
                          key={idx}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <span
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            {pause.temp}°C
                            <Badge
                              color="primary"
                              pill
                              style={{ marginLeft: 5 }}
                            >
                              {pause.time} мин
                            </Badge>
                          </span>
                          <span>
                            <ListButton
                              type="button"
                              onClick={() => pauses.delete(idx)}
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
                        type="number"
                        name="temp"
                        id="temp"
                        min={1}
                        placeholder="°C"
                        innerRef={pausesRefs.temp}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="number"
                        name="time"
                        id="time"
                        placeholder="Минуты"
                        innerRef={pausesRefs.time}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      style={{ width: '100%' }}
                      color="primary"
                      onClick={pauses.add}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </AddRecipeCard>
            <ButtonContainer>
              <Button
                style={{ width: 200 }}
                onClick={handleSubmit}
                color="success"
                disabled={loading}
              >
                <ButtonInner>
                  {loading ? (
                    <BarLoader color="white" />
                  ) : type === RecipeFormType.EDIT ? (
                    'Сохранить'
                  ) : (
                    'Добавить'
                  )}
                </ButtonInner>
              </Button>
            </ButtonContainer>
          </>
        )}
      </AddRecipeForm>
    </RecipeFormWrapper>
  )
}

export default RecipeForm

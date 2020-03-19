import React, { useState, useRef, useEffect } from 'react'
import {
  AddRecipePageWrapper,
  AddRecipeForm,
  ListButton,
  AddRecipeCard,
  ButtonContainer,
  ButtonInner,
} from './AddRecipePage.styles'
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
import {
  RecipeType,
  Recipe,
  RecipeAccessType,
  Pause,
  Grain,
  Hop,
  Yeast,
} from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ibuCalculator, abvCalculator, fetchRefresh } from '../../utils'
import { toast } from 'react-toastify'
import constants from '../../constants'
import { useHistory } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const AddRecipePage: React.FC = () => {
  const history = useHistory()

  const [recipe, setRecipe] = useState<Recipe>({
    title: 'Test IPA',
    description: '',
    details: '',
    style: '',
    volume: 25,
    abv: 0,
    ibu: 0,
    og: 12,
    fg: 2,
    type: RecipeType.PUBLIC,
    pauses: [{ temp: 55, time: 55 }],
    ingredients: {
      hops: [
        {
          name: 'Citra',
          time: 55,
          alpha: 20,
          weight: 25,
        },
      ],
      grains: [
        {
          name: 'Pils',
          weight: 5,
        },
      ],
      yeast: {
        name: 'S56',
        weight: 11,
        temp: 24,
      },
    },
    // title: '',
    // description: '',
    // details: '',
    // style: '',
    // volume: 0,
    // abv: 0,
    // ibu: 0,
    // og: 0,
    // fg: 0,
    // recipeType: RecipeType.PUBLIC,
    // pauses: [],
    // ingredients: {
    //   hops: [],
    //   grains: [],
    //   yeast: null,
    // },
  })

  // const [grains, setGrains] = useState<Grain[]>([])
  const [grains, setGrains] = useState<Grain[]>([
    {
      name: 'Pils',
      weight: 5,
    },
  ])
  // const [hops, setHops] = useState<Hop[]>([])
  const [hops, setHops] = useState<Hop[]>([
    {
      name: 'Citra',
      time: 55,
      alpha: 20,
      weight: 25,
    },
  ])
  // const [yeast, setYeast] = useState<Yeast | null>(null)
  const [yeast, setYeast] = useState<Yeast | null>({
    name: 'S56',
    weight: 11,
    temp: 24,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setRecipe(prev =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.value,
      }),
    )
  }

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (e.target.checked) {
      setRecipe(prev =>
        Object.assign({}, prev, {
          type: RecipeType.PRIVATE,
          access: RecipeAccessType.USER_ONLY,
        }),
      )
    } else {
      setRecipe(prev => {
        delete prev.access
        return Object.assign({}, prev, {
          type: RecipeType.PUBLIC,
        })
      })
    }
  }

  const handleUrlAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (e.target.checked && recipe.type === RecipeType.PRIVATE) {
      setRecipe(prev =>
        Object.assign({}, prev, {
          access: RecipeAccessType.URL,
        }),
      )
    } else {
      setRecipe(prev =>
        Object.assign({}, prev, {
          access: RecipeAccessType.USER_ONLY,
        }),
      )
    }
  }

  const temp = useRef<HTMLInputElement>(null)
  const time = useRef<HTMLInputElement>(null)

  const grainName = useRef<HTMLInputElement>(null)
  const grainWeight = useRef<HTMLInputElement>(null)

  const hopName = useRef<HTMLInputElement>(null)
  const hopWeight = useRef<HTMLInputElement>(null)
  const hopAlpha = useRef<HTMLInputElement>(null)
  const hopTime = useRef<HTMLInputElement>(null)

  const yeastName = useRef<HTMLInputElement>(null)
  const yeastWeight = useRef<HTMLInputElement>(null)
  const yeastTemp = useRef<HTMLInputElement>(null)

  const [batchVolume, setBatchVolume] = useState('27')

  const handleBatchVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatchVolume(e.target.value)
  }

  const compareTemps = (a: Pause, b: Pause) => {
    return a.temp - b.temp
  }

  const compareTimes = (a: Hop, b: Hop) => {
    return b.time - a.time
  }

  const addPause = () => {
    if (
      temp.current !== null &&
      time.current !== null &&
      parseInt(temp.current.value) > 0 &&
      parseInt(time.current.value) > 0
    ) {
      const tempVal = parseInt(temp.current.value)
      const timeVal = parseInt(time.current.value)

      setRecipe(prev =>
        Object.assign({}, prev, {
          pauses: prev.pauses
            .concat([{ temp: tempVal, time: timeVal }])
            .sort(compareTemps),
        }),
      )

      temp.current.value = ''
      time.current.value = ''

      temp.current.focus()
    }
  }

  const deletePause = (idx: number) => {
    let pauses = recipe.pauses

    pauses.splice(idx, 1)

    setRecipe(prev =>
      Object.assign({}, prev, {
        pauses,
      }),
    )
  }

  const addGrain = () => {
    if (
      grainName.current !== null &&
      grainWeight.current !== null &&
      grainName.current.value !== '' &&
      parseFloat(grainWeight.current.value) > 0
    ) {
      const name = grainName.current.value.trim()
      const weight = parseFloat(grainWeight.current.value)

      setGrains(prev => prev.concat([{ name, weight }]))

      grainName.current.value = ''
      grainWeight.current.value = ''

      grainName.current.focus()
    }
  }

  const deleteGrain = (idx: number) => {
    let buf = grains

    buf.splice(idx, 1)

    setGrains(buf.slice())
  }

  const addHop = () => {
    if (
      hopName.current !== null &&
      hopWeight.current !== null &&
      hopName.current.value !== '' &&
      parseFloat(hopWeight.current.value) > 0 &&
      hopAlpha.current !== null &&
      parseFloat(hopAlpha.current.value) > 0 &&
      hopTime.current !== null &&
      parseInt(hopTime.current.value) > 0
    ) {
      const name = hopName.current.value.trim()
      const weight = parseFloat(hopWeight.current.value)
      const alpha = parseFloat(hopAlpha.current.value)
      const time = parseInt(hopTime.current.value)

      setHops(prev =>
        prev.concat([{ name, weight, alpha, time }]).sort(compareTimes),
      )

      hopName.current.value = ''
      hopWeight.current.value = ''
      hopAlpha.current.value = ''
      hopTime.current.value = ''

      hopName.current.focus()
    }
  }

  const deleteHop = (idx: number) => {
    let buf = hops

    buf.splice(idx, 1)

    setHops(buf.slice())
  }

  const addYeast = () => {
    if (
      yeastName.current !== null &&
      yeastWeight.current !== null &&
      yeastTemp.current !== null &&
      yeastName.current.value !== '' &&
      parseFloat(yeastWeight.current.value) > 0 &&
      parseInt(yeastTemp.current.value) > 0
    ) {
      const name = yeastName.current.value.trim()
      const weight = parseFloat(yeastWeight.current.value)
      const temp = parseInt(yeastTemp.current.value)

      setYeast({
        name,
        weight,
        temp,
      })

      yeastName.current.value = ''
      yeastWeight.current.value = ''
      yeastTemp.current.value = ''

      yeastName.current.focus()
    }
  }

  const deleteYeast = () => {
    setYeast(null)
  }

  useEffect(() => {
    setRecipe(prev =>
      Object.assign({}, prev, {
        ingredients: {
          grains,
          hops,
          yeast,
        },
      }),
    )
  }, [grains, hops, yeast])

  const [autoIbuCalc, setAutoIbuCalc] = useState(true)
  const [autoAbvCalc, setAutoAbvCalc] = useState(true)

  useEffect(() => {
    if (
      autoIbuCalc &&
      parseInt(batchVolume) > 0 &&
      hops.length > 0 &&
      recipe.volume > 0 &&
      recipe.og > 0
    )
      setRecipe(prev =>
        Object.assign({}, prev, {
          ibu:
            ibuCalculator(
              recipe.og,
              recipe.volume,
              parseInt(batchVolume),
              hops,
            ) | 0,
        }),
      )
  }, [hops, recipe.volume, recipe.og, batchVolume, autoIbuCalc])

  useEffect(() => {
    if (autoAbvCalc && recipe.og > 0 && recipe.fg >= 0) {
      setRecipe(prev =>
        Object.assign({}, prev, {
          abv: abvCalculator(recipe.og, recipe.fg),
        }),
      )
    } else if (autoAbvCalc && (recipe.og < 0 || recipe.fg < 0)) {
      setRecipe(prev =>
        Object.assign({}, prev, {
          abv: 0,
        }),
      )
    }
  }, [recipe.og, recipe.fg, autoAbvCalc])

  const isValid = () => {
    if (recipe.title === '') {
      toast.error('Название не должно быть пустым!')
      return false
    } else if (recipe.volume === 0) {
      toast.error('Укажите объем партии!')
      return false
    } else if (recipe.ingredients.grains.length === 0) {
      toast.error('Укажите содержание алкоголя!')
      return false
    } else if (recipe.ingredients.grains.length === 0) {
      toast.error('Укажите IBU!')
      return false
    } else if (recipe.og === 0) {
      toast.error('Укажите начальную плотность!')
      return false
    } else if (recipe.fg === 0) {
      toast.error('Укажите конечную плотность!')
      return false
    } else if (recipe.ingredients.grains.length === 0) {
      toast.error('Зерновые должны содержать хотя бы 1 ингредиент!')
      return false
    } else if (recipe.ingredients.hops.length === 0) {
      toast.error('Хмель должен содержать хотя бы 1 ингредиент!')
      return false
    } else if (recipe.ingredients.yeast === null) {
      toast.error('Добавьте дрожжи!')
      return false
    } else if (recipe.pauses.length === 0) {
      toast.error('Должна быть хотя бы 1 пауза!')
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async () => {
    if (isValid()) {
      setLoading(true)

      const response = await fetchRefresh(constants.RECIPES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })

      if (response.ok) {
        toast.success('Рецепт добавлен!')
        history.push('/my-recipes')
      } else {
        toast.error('Ошибка добавления!')
      }

      setLoading(false)
    }
  }

  return (
    <AddRecipePageWrapper>
      <AddRecipeForm
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <Row form>
          <Col>
            <FormGroup>
              <CustomInput
                type="switch"
                id="type"
                name="type"
                label="Приватный"
                onChange={handleSwitch}
              />
            </FormGroup>
          </Col>
          {recipe.type === RecipeType.PRIVATE && (
            <Col>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  id="urlAccess"
                  label="Доступ по ссылке"
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
            name="style"
            id="style"
            onChange={handleChange}
            value={recipe.style}
          />
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="batchVolume">Объем до кипячения</Label>
              <Input
                type="number"
                name="batchVolume"
                id="batchVolume"
                min={0}
                value={batchVolume}
                onChange={handleBatchVolumeChange}
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
            e.key === 'Enter' && addGrain()
          }}
        >
          <CardBody>
            <h6>Зерновые</h6>
            {recipe.ingredients && recipe.ingredients.grains && (
              <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                {recipe.ingredients.grains.map((grain, idx) => {
                  return (
                    <ListGroupItem
                      key={idx}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {grain.name}
                        <Badge pill style={{ marginLeft: 5 }}>
                          {grain.weight} кг
                        </Badge>
                      </span>
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
                    name="grainName"
                    id="grainName"
                    placeholder="Название"
                    innerRef={grainName}
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
                    innerRef={grainWeight}
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
        </AddRecipeCard>
        <AddRecipeCard
          onKeyDown={(e: React.KeyboardEvent) => {
            e.key === 'Enter' && addHop()
          }}
        >
          <CardBody>
            <h6>Хмель</h6>
            {recipe.ingredients && recipe.ingredients.hops && (
              <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                {recipe.ingredients.hops.map((hop, idx) => {
                  return (
                    <ListGroupItem
                      key={idx}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {hop.name}
                        <Badge pill style={{ marginLeft: 5 }}>
                          {hop.weight} г
                        </Badge>
                        <Badge color="success" pill style={{ marginLeft: 5 }}>
                          {hop.alpha} %
                        </Badge>
                        <Badge color="primary" pill style={{ marginLeft: 5 }}>
                          {hop.time} мин
                        </Badge>
                      </span>
                      <span>
                        <ListButton
                          type="button"
                          onClick={() => deleteHop(idx)}
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
                    name="hopName"
                    id="hopName"
                    placeholder="Название"
                    innerRef={hopName}
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
                    innerRef={hopAlpha}
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
                    innerRef={hopWeight}
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
                    innerRef={hopTime}
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
        </AddRecipeCard>
        <AddRecipeCard
          onKeyDown={(e: React.KeyboardEvent) => {
            e.key === 'Enter' && addYeast()
          }}
        >
          <CardBody>
            <h6>Дрожжи</h6>
            {recipe.ingredients && recipe.ingredients.yeast && (
              <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                <ListGroupItem className="d-flex align-items-center justify-content-between">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {recipe.ingredients.yeast.name}
                    <Badge pill style={{ marginLeft: 5 }}>
                      {recipe.ingredients.yeast.weight} г
                    </Badge>
                    <Badge color="info" pill style={{ marginLeft: 5 }}>
                      {recipe.ingredients.yeast.temp} °C
                    </Badge>
                  </span>
                  <span>
                    <ListButton type="button" onClick={deleteYeast}>
                      <FontAwesomeIcon icon={faTimes} />
                    </ListButton>
                  </span>
                </ListGroupItem>
              </ListGroup>
            )}
            {yeast === null && (
              <>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Input
                        type="text"
                        name="yeastName"
                        id="yeastName"
                        placeholder="Название"
                        innerRef={yeastName}
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
                        innerRef={yeastWeight}
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
                        innerRef={yeastTemp}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
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
              </>
            )}
          </CardBody>
        </AddRecipeCard>
        <AddRecipeCard
          onKeyDown={(e: React.KeyboardEvent) => {
            e.key === 'Enter' && addPause()
          }}
        >
          <CardBody>
            <h6>Температурные паузы</h6>
            {recipe.pauses && (
              <ListGroup style={{ marginBottom: 15, marginTop: 10 }}>
                {recipe.pauses.map((pause, idx) => {
                  return (
                    <ListGroupItem
                      key={idx}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {pause.temp}°C
                        <Badge color="primary" pill style={{ marginLeft: 5 }}>
                          {pause.time} мин
                        </Badge>
                      </span>
                      <span>
                        <ListButton
                          type="button"
                          onClick={() => deletePause(idx)}
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
                    innerRef={temp}
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
                    innerRef={time}
                  />
                </FormGroup>
              </Col>
              <Col>
                <Button
                  style={{ width: '100%' }}
                  color="primary"
                  onClick={addPause}
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
              {loading ? <BarLoader color="white" /> : 'Добавить'}
            </ButtonInner>
          </Button>
        </ButtonContainer>
      </AddRecipeForm>
    </AddRecipePageWrapper>
  )
}

export default AddRecipePage

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RecipesList from './RecipesList'
import { createStore } from '@reatom/core'
import { Provider } from '@reatom/react'

let store: any

const recipe = JSON.parse(
  `{"ingredients":{"yeast":{"name":"Fermentis - Сафэль US-05","weight":27,"temp":18},"grains":[{"_id":"5ea4500a3dce1f6ab16efca7","name":"Пэйл Эль Курский (Россия)","weight":9},{"_id":"5ea4500a3dce1f6ab16efca8","name":"Овсяные хлопья","weight":1.2},{"_id":"5ea4500a3dce1f6ab16efca9","name":"Пшеничный светлый Суффле (Россия)","weight":3}],"hops":[{"_id":"5ea4500a3dce1f6ab16efcaa","name":"Мандарина Бавария (Германия)","weight":30,"alpha":8.5,"time":30},{"_id":"5ea4500a3dce1f6ab16efcab","name":"Мандарина Бавария (Германия)","weight":30,"alpha":8,"time":10},{"_id":"5ea4500a3dce1f6ab16efcac","name":"Амарилло (США)","weight":50,"alpha":9.2,"time":1},{"_id":"5ea4500a3dce1f6ab16efcad","name":"Мандарина Бавария (Германия)","weight":40,"alpha":8.5,"time":0}],"dryHops":[{"_id":"5ea4500a3dce1f6ab16efcae","name":"Цитра (США)","weight":50,"when":"Главное брожение","time":5},{"_id":"5ea4500a3dce1f6ab16efcaf","name":"Амарилло (США)","weight":50,"when":"Вторичное брожение","time":5},{"_id":"5ea4500a3dce1f6ab16efcb0","name":"Цитра (США)","weight":50,"when":"Вторичное брожение","time":5}],"others":[{"_id":"5ea4500a3dce1f6ab16efcb1","name":"Лактоза","weight":800,"when":"В котел","time":15},{"_id":"5ea4500a3dce1f6ab16efcb2","name":"Манго","weight":2200,"when":"Главное брожение"},{"_id":"5ea4500a3dce1f6ab16efcb3","name":"Ваниль","weight":10,"when":"Карбонизация"},{"_id":"5ea458153dce1f6ab16efcda","name":"Цедра апельсина","weight":20,"when":"Карбонизация"}]},"rating":0,"votes":[0,0,0,0,0],"recipeType":"PUBLIC","_id":"5ea458153dce1f6ab16efccc","pauses":[{"_id":"5ea4500a3dce1f6ab16efca3","temp":52,"time":15},{"_id":"5ea4500a3dce1f6ab16efca4","temp":63,"time":60},{"_id":"5ea4500a3dce1f6ab16efca5","temp":72,"time":20},{"_id":"5ea4500a3dce1f6ab16efca6","temp":78,"time":5}],"title":"Взрывной манго-апельсиновый милкшейк","description":"Хочу получить ароматный, не горький милкшейк. Нашёл в продаже манговое пюре. Манго приобретается уже готовым пюре и добавляется на третий день после начала брожения. Цедра с 3-х апельсинов и ванилин, предварительно замоченные в ректификате, добавляются вместе с декстрозой при розливе по бутылкам.","details":"","style":"ИПЭ Новой Англии (NE IPA)","mashWater":38.3,"flushingWater":34.8,"volume":50,"batchVolume":58.6,"abv":6.24,"ibu":13,"og":14.9,"fg":3.8,"author":"max","userId":"5ea457aa3dce1f6ab16efcca","forked":"98o718","created_at":"2020-04-25T15:32:37.805Z","updated_at":"2020-04-25T15:32:37.805Z","__v":0,"id":"5ea458153dce1f6ab16efccc"}`,
)

beforeEach(() => {
  store = createStore({
    user: {
      sub: '5ea457aa3dce1f6ab16efcca',
    },
  })
})

describe('RecipesList component', () => {
  it('renders without crashing without recipes', () => {
    const defaultProps = {
      recipes: [],
    }

    const { container } = render(
      <Provider value={store}>
        <BrowserRouter>
          <RecipesList {...defaultProps} />
        </BrowserRouter>
      </Provider>,
    )

    expect(container).toBeTruthy()
  })

  it('renders without crashing with recipes', () => {
    const defaultProps = {
      recipes: [recipe],
    }

    const { container } = render(
      <Provider value={store}>
        <BrowserRouter>
          <RecipesList {...defaultProps} />
        </BrowserRouter>
      </Provider>,
    )

    expect(container).toBeTruthy()
  })

  it('emits deleting on click delete button', () => {
    const defaultProps = {
      recipes: [recipe],
    }

    const handleDelete = jest.fn()
    const handleEdit = jest.fn()

    const { getByTestId } = render(
      <Provider value={store}>
        <BrowserRouter>
          <RecipesList
            {...defaultProps}
            showButtons
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </BrowserRouter>
      </Provider>,
    )

    const deleteButton = getByTestId('delete-button')

    expect(deleteButton).toBeTruthy()

    fireEvent.click(deleteButton)

    expect(handleDelete).toBeCalled()
  })

  it('emits editing on click delete button', () => {
    const defaultProps = {
      recipes: [recipe],
    }

    const handleDelete = jest.fn()
    const handleEdit = jest.fn()

    const { getByTestId } = render(
      <Provider value={store}>
        <BrowserRouter>
          <RecipesList
            {...defaultProps}
            showButtons
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </BrowserRouter>
      </Provider>,
    )

    const editButton = getByTestId('edit-button')

    expect(editButton).toBeTruthy()

    fireEvent.click(editButton)

    expect(handleEdit).toBeCalled()
  })
})

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BrewForm from './BrewForm'
import { BrowserRouter } from 'react-router-dom'

const defaultProps = {
  edit: false,
  isLoading: false,
  isSending: false,
  id: '1',
  brew: {
    recipe: 'test',
    title: 'test',
    comment: 'test',
    brewDate: new Date(),
    bottlingDate: new Date(),
  },
}

describe('BrewForm component', () => {
  it('renders without crashing', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { container } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    expect(container).toBeTruthy()
  })

  it('updates volume input', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    const volumeInput = getByTestId('input-volume')

    fireEvent.change(volumeInput, { target: { value: 1 } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('updates og input', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    const ogInput = getByTestId('input-og')

    fireEvent.change(ogInput, { target: { value: 1 } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('updates fg input', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    const fgInput = getByTestId('input-fg')

    fireEvent.change(fgInput, { target: { value: 1 } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('updates comment input', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    const commentInput = getByTestId('input-comment')

    fireEvent.change(commentInput, { target: { value: 1 } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('emits submitting on submit button click', () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    const setDate = jest.fn()

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewForm
          {...defaultProps}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setDate={setDate}
        />
      </BrowserRouter>,
    )

    const submitButton = getByTestId('button-submit')

    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalled()
  })
})

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BrewsList from './BrewsList'
import BeerWave from '../BeerWave'

describe('BrewsList component', () => {
  it('renders without crashing without brews', () => {
    const defaultProps = {
      brews: [],
      handleDelete: jest.fn(),
      handleEdit: jest.fn(),
    }

    const { container } = render(<BrewsList {...defaultProps} />)

    expect(container).toBeTruthy()
  })

  it('renders without crashing with brews', () => {
    const brew = JSON.parse(
      `{"_id":"5ed8dad4b2909e0ac380c02a","recipe":"5ea458153dce1f6ab16efccc","title":"Взрывной манго-апельсиновый милкшейк","comment":"","brewDate":"2020-06-04T11:30:00.000Z","bottlingDate":"2020-06-05T11:30:00.000Z","userId":"5ea457aa3dce1f6ab16efcca","__v":0,"id":"5ed8dad4b2909e0ac380c02a"}`,
    )

    const defaultProps = {
      brews: [brew],
      handleDelete: jest.fn(),
      handleEdit: jest.fn(),
    }

    const { container } = render(
      <BrowserRouter>
        <BrewsList {...defaultProps} />
      </BrowserRouter>,
    )

    expect(container).toBeTruthy()
  })

  it('emits deleting on click delete button', () => {
    const handleDelete = jest.fn()
    const handleEdit = jest.fn()

    const brew = {
      recipe: '',
      title: '',
      id: '',
      brewDate: '2020-05-05',
      bottlingDate: '2020-05-05',
    }

    const defaultProps = {
      brews: [brew],
      handleDelete,
      handleEdit,
      showButtons: true,
    }

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewsList {...defaultProps} />
      </BrowserRouter>,
    )

    const deleteButton = getByTestId('delete-button')

    expect(deleteButton).toBeTruthy()

    fireEvent.click(deleteButton)

    expect(handleDelete).toBeCalled()
  })

  it('emits editing on click edit button', () => {
    const handleDelete = jest.fn()
    const handleEdit = jest.fn()

    const brew = {
      recipe: '',
      title: '',
      id: '',
      brewDate: '2020-05-05',
      bottlingDate: '2020-05-05',
    }

    const defaultProps = {
      brews: [brew],
      handleDelete,
      handleEdit,
      showButtons: true,
    }

    const { getByTestId } = render(
      <BrowserRouter>
        <BrewsList {...defaultProps} />
      </BrowserRouter>,
    )

    const editButton = getByTestId('edit-button')

    expect(editButton).toBeTruthy()

    fireEvent.click(editButton)

    expect(handleEdit).toBeCalled()
  })
})

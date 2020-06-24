import React from 'react'
import { render } from '@testing-library/react'
import Layout from './Layout'

describe('Layout component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout />)

    expect(container).toBeTruthy()
  })
})

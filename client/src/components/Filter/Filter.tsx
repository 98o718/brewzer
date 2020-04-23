import React from 'react'
import { FilterWrapper } from './Filter.styles'
import { Input, InputGroupAddon, Button, InputGroup } from 'reactstrap'

type FilterProps = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  reset: () => void
}

const Filter = ({ value, handleChange, reset }: FilterProps) => {
  return (
    <FilterWrapper>
      <InputGroup style={{ width: 200 }}>
        <Input placeholder="Фильтр" value={value} onChange={handleChange} />
        {value !== '' && (
          <InputGroupAddon addonType="append">
            <Button onClick={reset}>Сброс</Button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FilterWrapper>
  )
}

export default Filter

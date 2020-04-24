import React from 'react'
import { FilterWrapper, FilterInputGroup } from './Filter.styles'
import { Input, InputGroupAddon, Button } from 'reactstrap'

type FilterProps = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  reset: () => void
}

const Filter = ({ value, handleChange, reset }: FilterProps) => {
  return (
    <FilterWrapper>
      <FilterInputGroup>
        <Input placeholder="Фильтр" value={value} onChange={handleChange} />
        {value !== '' && (
          <InputGroupAddon addonType="append">
            <Button onClick={reset}>Сброс</Button>
          </InputGroupAddon>
        )}
      </FilterInputGroup>
    </FilterWrapper>
  )
}

export default Filter

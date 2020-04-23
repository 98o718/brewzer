import React from 'react'
import { Search } from '../../components'
import { useSearch } from '../../hooks'

const SearchPage: React.FC = () => {
  const searchProps = useSearch()

  return <Search {...searchProps} />
}

export default SearchPage

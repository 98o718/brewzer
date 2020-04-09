import React from 'react'

import { BrewsList } from '../../components'
import { BrewDescription } from '../../types'
import { useOnlineDetector, useFetch, useMyBrews } from '../../hooks'

const MyBrewsPage: React.FC = () => {
  const [brews, , reload] = useFetch<BrewDescription[]>(
    process.env.REACT_APP_BREWS_URL!,
  )
  const { isOnline } = useOnlineDetector()
  const { handleDelete, handleEdit } = useMyBrews(reload)

  const sortByDate = (a: BrewDescription, b: BrewDescription) => {
    return Date.parse(a.brewDate) - Date.parse(b.brewDate)
  }

  return (
    <BrewsList
      width="500px"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      heading="Ваши варки"
      brews={brews !== undefined ? brews.sort(sortByDate) : brews}
      showButtons={isOnline}
    />
  )
}

export default MyBrewsPage

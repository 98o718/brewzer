import React from 'react'

import { BrewsList, Filter } from '../../components'
import { BrewDescription } from '../../types'
import { useOnlineDetector, useFetch, useMyBrews } from '../../hooks'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { useFilter } from '../../hooks/useFilter'

const MyBrewsPage: React.FC = () => {
  const [brews, , error, reload] = useFetch<BrewDescription[]>(
    process.env.REACT_APP_BREWS_URL!,
  )
  const { isOnline } = useOnlineDetector()
  const { handleDelete, handleEdit } = useMyBrews(reload)

  const { filtered, ...filterProps } = useFilter<BrewDescription>(
    brews,
    'title',
  )

  const sortByDate = (a: BrewDescription, b: BrewDescription) => {
    return Date.parse(a.brewDate) - Date.parse(b.brewDate)
  }

  if (error) {
    toast.error('Ошибка загрузки!')

    return <Redirect to="/" />
  }

  return (
    <>
      {brews && brews.length !== 0 && <Filter {...filterProps} />}
      <BrewsList
        width="500px"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        heading="Ваши варки"
        brews={filtered !== undefined ? filtered.sort(sortByDate) : filtered}
        showButtons={isOnline}
      />
    </>
  )
}

export default MyBrewsPage

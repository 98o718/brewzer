import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useBrewForm } from '../../hooks'
import { BrewForm } from '../../components'

type AddBrewPageProps = {
  readonly id: string
  readonly volume: string
}

const AddBrewPage = ({ match }: RouteComponentProps<AddBrewPageProps>) => {
  const brewFormProps = useBrewForm({
    id: match.params.id,
    volume: +match.params.volume,
  })

  return <BrewForm {...brewFormProps} />
}

export default AddBrewPage

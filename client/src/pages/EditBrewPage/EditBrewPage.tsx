import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useBrewForm } from '../../hooks'
import { BrewForm } from '../../components'

type EditBrewPageProps = {
  readonly id: string
}

const EditBrewPage = ({ match }: RouteComponentProps<EditBrewPageProps>) => {
  const brewFormProps = useBrewForm({ id: match.params.id, edit: true })

  return <BrewForm {...brewFormProps} />
}

export default EditBrewPage

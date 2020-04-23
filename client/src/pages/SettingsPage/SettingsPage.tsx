import React from 'react'
import { Settings } from '../../components'
import { useSettings } from '../../hooks'

const SettingsPage = () => {
  const settingsProps = useSettings()

  return <Settings {...settingsProps} />
}

export default SettingsPage

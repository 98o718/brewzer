import React from 'react'
import { NoPrintWrapper } from './NoPrint.styles'

type NoPrintProps = {
  children: React.ReactChild
  style?: React.CSSProperties
}

const NoPrint = ({ children, style }: NoPrintProps) => {
  return <NoPrintWrapper style={style}>{children}</NoPrintWrapper>
}

export default NoPrint

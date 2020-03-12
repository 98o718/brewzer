import React from 'react'
import { NotFoundPageWrapper } from './NotFoundPage.styles'

import sad from '../../assets/sad.svg'

const NotFoundPage: React.FC = () => (
  <NotFoundPageWrapper>
    <img
      style={{ display: 'block', width: '80%', maxWidth: 270 }}
      src={sad}
      alt="sad face"
    />
    <p style={{ marginTop: 15, fontSize: 25 }}>Ничего здесь нет</p>
  </NotFoundPageWrapper>
)

export default NotFoundPage

import styled from '@emotion/styled'
import { Button } from 'reactstrap'

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`

export const HeaderButton = styled(Button)`
  margin-left: 15px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 15px;
  }
`

export const AvatarWrapper = styled.div`
  margin-left: 15px;
  display: inline-flex;
  /* align-items: center; */

  @media (max-width: 767px) {
    display: none;
  }
`

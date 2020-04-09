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
  background: lightgray;
  border-radius: 50%;
  display: inline-flex;
  /* align-items: center; */

  @media (max-width: 767px) {
    display: none;
  }
`

export const OfflineIndicator = styled.span`
  color: #dc3445;
  font-size: 1rem;
  background: RGB(220, 52, 69);
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  margin-left: 15px;
  box-shadow: 0 0 60px 30px #fff, 0 0 15px 3px #dc3445;
`

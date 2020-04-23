import styled from '@emotion/styled'

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
  justify-content: space-evenly;
  flex-wrap: wrap;

  @media only screen and (max-width: 455px) {
    .drop {
      margin-top: 30px;
      margin-left: 0 !important;
    }
  }
`

export const ButtonInner = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

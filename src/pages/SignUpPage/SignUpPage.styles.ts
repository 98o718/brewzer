import styled from '@emotion/styled'

export const SignUpPageWrapper = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  justify-content: center;
`
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
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

import styled from '@emotion/styled'

export const BrewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ButtonInner = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 710px) {
    flex-direction: column;
  }

  .form-group:first-of-type {
    margin-right: 15px;

    @media (max-width: 710px) {
      margin-right: 0;
    }
  }
`

import styled from '@emotion/styled'

type RecipesListWrapperProps = {
  type: string | undefined
}

export const RecipesListWrapper = styled.div<RecipesListWrapperProps>`
  display: flex;
  flex-direction: column;
  /* width: ${props => (props.type ? '100%' : '40%')}; */
  width: 100%;
  min-width: 270px;
  /* max-width: 550px; */
  margin-right: ${props => (props.type ? '0' : '30px')};
  margin-bottom: 30px;

  &:last-child {
    margin-right: 0;
  }
`

export const Recipe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Lock = styled.span`
  display: block;
  width: fit-content;
  cursor: pointer;
`

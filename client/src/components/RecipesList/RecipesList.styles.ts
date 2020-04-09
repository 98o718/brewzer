import styled from '@emotion/styled'

type RecipesListWrapperProps = {
  type?: string
}

export const RecipesListWrapper = styled.div<RecipesListWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
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

export const RecipeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const RecipeRightPanel = styled.div`
  margin-left: 30px;
  align-self: center;
  display: flex;
  align-items: center;
`

export const ButtonsWrapper = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
`

type IconButtonProps = {
  color?: string
}

export const IconButton = styled.button<IconButtonProps>`
  border: none;
  background: transparent;
  margin-left: 10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.2s;
  color: lightgray;

  &:focus,
  &:hover {
    outline: none;
    transform: scale(1.1);
    color: ${(props) => (props.color ? props.color : 'black')};
  }

  &:active {
    transform: scale(0.9);
  }
`

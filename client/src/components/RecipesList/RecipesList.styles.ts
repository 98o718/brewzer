import styled from '@emotion/styled'
import { ListGroupItem } from 'reactstrap'

type RecipesListWrapperProps = {
  type?: string
}

export const RecipesListWrapper = styled.div<RecipesListWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    width: 100% !important;
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

export const RecipeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    align-items: center;
    width: 100%;

    * {
      text-align: center;
    }
  }
`

export const RecipeRightPanel = styled.div`
  margin-left: 30px;
  align-self: center;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    margin-left: 8px;
  }
`

export const ButtonsWrapper = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    margin-top: 15px;
    justify-content: center;
    margin-left: 0;
  }
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

type RecipeListGroupItemProps = {
  column?: boolean
}

export const RecipeListGroupItem = styled(ListGroupItem)<
  RecipeListGroupItemProps
>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  justify-content: space-between;
`

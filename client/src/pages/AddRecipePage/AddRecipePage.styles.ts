import styled from '@emotion/styled'
import { Form, Card } from 'reactstrap'

export const AddRecipePageWrapper = styled.div`
  display: flex;
  padding: 30px 50px;
  flex-direction: column;
  align-items: center;
`
export const AddRecipeForm = styled(Form)`
  width: 400px;
`
export const AddRecipeCard = styled(Card)`
  margin-bottom: 15px;
`

export const ListButton = styled.button`
  border: none;
  background: transparent;
  transition: 0.2s;
  color: lightgray;

  &:hover,
  &:focus {
    outline: none;
    transform: scale(1.1);
    color: black;
    outline: none;
  }

  &:active {
    transform: scale(0.9);
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

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

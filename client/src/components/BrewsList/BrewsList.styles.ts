import styled from '@emotion/styled'

export const BrewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 270px;
  margin-bottom: 30px;
`

export const BrewItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const BrewHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

export const ButtonsWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const IconButton = styled.button<{ color?: string }>`
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

export const BrewInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`

export const BrewInfo = styled.span`
  font-weight: bold;
  margin-right: 10px;
`

export const BrewComment = styled.span`
  margin: 5px 0;
`

import styled from '@emotion/styled'

export const IbuPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ItemWrapper = styled.div`
  line-height: normal;

  * {
    box-decoration-break: clone;
    margin: 3px;
  }
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

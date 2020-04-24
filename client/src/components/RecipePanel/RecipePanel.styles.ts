import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Input } from 'reactstrap'

export const RecipePanelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;

  button {
    margin: 8px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 576px) {
    justify-content: center;
  }
`

export const VolumeInput = styled(Input)`
  width: 100px;
  margin: 8px;

  &::placeholder {
    text-align: center;
  }
`

export const IconButton = styled.button<{ color?: string }>`
  border: none;
  background: none;
  width: fit-content;
  transition: 0.2s;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  &:hover,
  &:focus {
    outline: none;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const RatingWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 1.2rem;
`

export const RatingValue = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-weight: bold;
  transition: 0.2s;
  margin: 5px;
  cursor: pointer;

  &:last-of-type {
    margin-right: 10px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: scale(1.3);
  }

  &:active {
    transform: scale(0.9);
  }
`

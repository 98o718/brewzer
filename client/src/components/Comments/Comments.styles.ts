import styled from '@emotion/styled'

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 15px;
`

export const CommentWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin-left: 10px;
  flex-grow: 1;
`

export const IconButtom = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  margin-top: 5px;
  color: #9e9e9e;
  width: fit-content;
  height: fit-content;
  padding: 0;
  transition: 0.2s;

  &:focus,
  &:hover {
    outline: none;
    color: #f44336;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const CommentDate = styled.span`
  color: #9e9e9e;
`

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: lightgray;
`

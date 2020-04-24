import styled from '@emotion/styled'

export const MyRecipesPanelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 15px;

  .btn {
    margin-right: 15px;

    &:last-of-type {
      margin-right: 0;
    }

    @media (max-width: 576px) {
      width: 100%;
    }
  }
`

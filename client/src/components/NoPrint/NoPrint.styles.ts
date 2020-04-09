import styled from '@emotion/styled'

export const NoPrintWrapper = styled.div`
  width: 100%;

  @media print {
    visibility: hidden;
  }
`

import styled from '@emotion/styled'
import { InputGroup } from 'reactstrap'

export const FilterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  @media (max-width: 576px) {
    margin-bottom: 30px;
  }
`

export const FilterInputGroup = styled(InputGroup)`
  width: 200px;
  @media (max-width: 576px) {
    width: 100%;
  }
`

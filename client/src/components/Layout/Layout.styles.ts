import styled from '@emotion/styled'

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 90px;
  padding-bottom: 110px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 10px;
    padding-top: 90px;
    padding-bottom: 80px;
  }
`

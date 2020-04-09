import styled from '@emotion/styled'
import { CardText, Card as C, CardBody } from 'reactstrap'

export const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media print {
    position: absolute;
    top: 15px;

    a {
      text-decoration: none;
    }
  }
`

export const TypeIcon = styled.span`
  font-size: 1.2rem;
  margin-left: 5px;

  @media print {
    display: none;
  }
`

export const DescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 15px;
  width: 100%;
`

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  width: 100%;
`

export const RecipeInfoWrapper = styled(CardBody)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`

export const BoldCardText = styled(CardText)`
  font-weight: bold;
  margin-right: 15px;
`

export const Card = styled(C)`
  border: none;
  width: 100%;
  height: fit-content;
`

export const ItemName = styled.span``

export const ItemWrapper = styled.div`
  line-height: normal;

  * {
    box-decoration-break: clone;
    margin: 3px;
  }
`

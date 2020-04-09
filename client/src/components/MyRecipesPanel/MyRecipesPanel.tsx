import React from 'react'
import { Button } from 'reactstrap'
import { MyRecipesPanelWrapper } from './MyRecipesPanel.styles'
import { Link } from 'react-router-dom'

const MyRecipesPanel: React.FC = () => {
  return (
    <MyRecipesPanelWrapper>
      <Button tag={Link} to="/add-recipe" color="primary">
        Добавить рецепт
      </Button>
      {/* <Button tag={Link} to="/add-recipe" color="danger">
        Удалить все
      </Button> */}
    </MyRecipesPanelWrapper>
  )
}

export default MyRecipesPanel

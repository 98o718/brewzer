import { useHistory } from 'react-router-dom'

import axios from 'axios'
import { toast } from 'react-toastify'

export const useMyRecipes = (handleLoad: () => void) => {
  const history = useHistory()

  const handleEdit = (id: string) => {
    history.push(`/edit-recipe/${id}`)
  }

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.REACT_APP_RECIPES_URL}/${id}`)
      .then(() => {
        handleLoad()
        toast.success('Рецепт удален')
      })
      .catch(() => {
        toast.error('Ошибка удаления!')
      })
  }

  return { handleEdit, handleDelete }
}

import { useHistory } from 'react-router-dom'

import { fetchRefresh } from '../utils'
import { toast } from 'react-toastify'

export const useMyRecipes = (handleLoad: () => void) => {
  const history = useHistory()

  const handleEdit = (id: string) => {
    history.push(`/edit-recipe/${id}`)
  }

  const handleDelete = (id: string) => {
    fetchRefresh(`${process.env.REACT_APP_RECIPES_URL}/${id}`, {
      method: 'DELETE',
    }).then(({ ok }) => {
      if (ok) {
        handleLoad()
        toast.success('Рецепт удален')
      } else {
        toast.error('Ошибка удаления!')
      }
    })
  }

  return { handleEdit, handleDelete }
}

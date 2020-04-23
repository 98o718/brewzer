import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const useMyBrews = (reload: () => void) => {
  const history = useHistory()

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.REACT_APP_BREWS_URL}/${id}`)
      .then(() => {
        reload()
        toast.success('Варка удалена')
      })
      .catch(() => {
        toast.error('Ошибка удаления')
      })
  }

  const handleEdit = (id: string) => {
    history.push(`/edit-brew/${id}`)
  }

  return { handleDelete, handleEdit }
}

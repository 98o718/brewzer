import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import { fetchRefresh } from '../utils'

export const useMyBrews = (reload: () => void) => {
  const history = useHistory()

  const handleDelete = (id: string) => {
    fetchRefresh(`${process.env.REACT_APP_BREWS_URL}/${id}`, {
      method: 'DELETE',
    }).then(({ ok }) => {
      if (ok) {
        reload()
        toast.success('Варка удалена')
      } else {
        toast.error('Ошибка удаления')
      }
    })
  }

  const handleEdit = (id: string) => {
    history.push(`/edit-brew/${id}`)
  }

  return { handleDelete, handleEdit }
}

import { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchRefresh } from '../utils'
import { toast } from 'react-toastify'

export const useFetch = <T>(
  url: string,
  id?: string,
): [T | undefined, boolean, () => void] => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const handleLoad = useCallback(() => {
    fetchRefresh(id ? `${url}/${id}` : url).then(({ ok, data }) => {
      if (ok) {
        setData(data)
        setLoading(false)
      } else {
        toast.error('Ошибка загрузки')
        history.push('/')
      }
    })
  }, [id, history, url])

  useEffect(() => {
    setLoading(true)
    handleLoad()
  }, [id, handleLoad])

  return [data, loading, handleLoad]
}

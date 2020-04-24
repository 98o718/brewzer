import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const useFetch = <T>(
  url: string,
  id?: string,
): [T | undefined, boolean, boolean, () => void] => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => {
    axios
      .get(id ? `${url}/${id}` : url)
      .then(({ data, status }) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [id, url])

  useEffect(() => {
    setLoading(true)
    handleLoad()
  }, [id, handleLoad])

  return [data, loading, error, handleLoad]
}

import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const useFetch = <T>(
  url: string,
  id?: string,
  fallbackUrls?: string[],
  fallbackProperty?: keyof T,
): [T | undefined, boolean, boolean, () => void] => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => {
    axios
      .get(id ? `${url}/${id}` : url)
      .then(({ data }) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        let entity: T | undefined = undefined

        if (
          fallbackUrls !== undefined &&
          fallbackUrls.length > 0 &&
          id !== undefined &&
          fallbackProperty !== undefined
        ) {
          const requests = fallbackUrls.map((url) => axios.get(url))

          Promise.allSettled(requests).then((results) => {
            const data: T[] = []

            results.forEach((result) => {
              if (result.status === 'fulfilled') {
                data.push(...result.value.data)
              }
            })

            entity = data.find(
              (item: T) => String(item[fallbackProperty]) === id,
            )

            if (entity === undefined) {
              setLoading(false)
              setError(true)
            } else {
              setData(entity)
              setLoading(false)
            }
          })
        } else {
          setLoading(false)
          setError(true)
        }
      })
  }, [id, url])

  useEffect(() => {
    setLoading(true)
    handleLoad()
  }, [id, handleLoad])

  return [data, loading, error, handleLoad]
}

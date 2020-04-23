import { useState, useEffect } from 'react'

export const useFilter = <T>(initArray: T[] | undefined, field: keyof T) => {
  const [value, setValue] = useState('')
  const [filtered, setFiltered] = useState<T[]>()

  useEffect(() => {
    if (
      initArray !== undefined &&
      initArray.length !== 0 &&
      typeof initArray[0][field] === 'string'
    ) {
      setFiltered(
        initArray.filter((item) => {
          const itemField = String(item[field])
          return itemField.toUpperCase().includes(value.trim().toUpperCase())
        }),
      )
    } else {
      setFiltered(initArray)
    }
  }, [value, field, initArray])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { filtered, value, handleChange, reset }
}

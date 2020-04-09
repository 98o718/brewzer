import { useState, useRef, useEffect } from 'react'
import { Yeast } from '../types'

export const useYeastInForm = (initialState: Yeast | null) => {
  const [yeast, setYeast] = useState<Yeast | null>(initialState)

  useEffect(() => {
    setYeast(initialState)
  }, [initialState])

  const name = useRef<HTMLInputElement>(null)
  const weight = useRef<HTMLInputElement>(null)
  const temp = useRef<HTMLInputElement>(null)

  const addYeast = () => {
    if (
      name.current !== null &&
      weight.current !== null &&
      temp.current !== null &&
      name.current.value !== '' &&
      weight.current.valueAsNumber > 0 &&
      temp.current.valueAsNumber > 0
    ) {
      const nameValue = name.current.value.trim()
      const weightValue = weight.current.valueAsNumber
      const tempValue = temp.current.valueAsNumber

      setYeast({
        name: nameValue,
        weight: weightValue,
        temp: tempValue,
      })

      name.current.value = ''
      weight.current.value = ''
      temp.current.value = ''

      name.current.focus()
    }
  }

  const deleteYeast = () => {
    setYeast(null)
  }

  return {
    yeast: {
      data: yeast,
      add: addYeast,
      delete: deleteYeast,
    },
    yeastRefs: {
      name,
      weight,
      temp,
    },
  }
}

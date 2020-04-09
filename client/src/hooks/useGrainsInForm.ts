import { useState, useRef, useEffect } from 'react'

import { Grain } from '../types'

export const useGrainsInForm = (initialState: Grain[]) => {
  const [grains, setGrains] = useState<Grain[]>(initialState)

  useEffect(() => {
    setGrains(initialState)
  }, [initialState])

  const name = useRef<HTMLInputElement>(null)
  const weight = useRef<HTMLInputElement>(null)

  const addGrain = () => {
    if (
      name.current !== null &&
      weight.current !== null &&
      name.current.value !== '' &&
      weight.current.valueAsNumber > 0
    ) {
      const nameValue = name.current.value.trim()
      const weightValue = weight.current.valueAsNumber

      setGrains((prev) =>
        prev.concat([{ name: nameValue, weight: weightValue }]),
      )

      name.current.value = ''
      weight.current.value = ''

      name.current.focus()
    }
  }

  const deleteGrain = (idx: number) => {
    let buf = grains

    buf.splice(idx, 1)

    setGrains(buf.slice())
  }

  return {
    grains: {
      data: grains,
      add: addGrain,
      delete: deleteGrain,
    },
    grainsRefs: {
      name,
      weight,
    },
  }
}

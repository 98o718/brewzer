import { useState, useRef, useEffect } from 'react'

import { Hop } from '../types'

export const useHopsInForm = (initialState: Hop[]) => {
  const [hops, setHops] = useState<Hop[]>(initialState)

  useEffect(() => {
    setHops(initialState)
  }, [initialState])

  const name = useRef<HTMLInputElement>(null)
  const weight = useRef<HTMLInputElement>(null)
  const alpha = useRef<HTMLInputElement>(null)
  const time = useRef<HTMLInputElement>(null)

  const compareTimes = (a: Hop, b: Hop) => {
    return b.time - a.time
  }

  const addHop = () => {
    if (
      name.current !== null &&
      weight.current !== null &&
      name.current.value !== '' &&
      weight.current.valueAsNumber > 0 &&
      alpha.current !== null &&
      alpha.current.valueAsNumber > 0 &&
      time.current !== null &&
      time.current.valueAsNumber >= 0
    ) {
      const nameValue = name.current.value.trim()
      const weightValue = weight.current.valueAsNumber
      const alphaValue = alpha.current.valueAsNumber
      const timeValue = time.current.valueAsNumber

      setHops((prev) =>
        prev
          .concat([
            {
              name: nameValue,
              weight: weightValue,
              alpha: alphaValue,
              time: timeValue,
            },
          ])
          .sort(compareTimes),
      )

      name.current.value = ''
      weight.current.value = ''
      alpha.current.value = ''
      time.current.value = ''

      name.current.focus()
    }
  }

  const deleteHop = (idx: number) => {
    let buf = hops

    buf.splice(idx, 1)

    setHops(buf.slice())
  }

  return {
    hops: {
      data: hops,
      add: addHop,
      delete: deleteHop,
    },
    hopsRefs: {
      name,
      weight,
      alpha,
      time,
    },
  }
}

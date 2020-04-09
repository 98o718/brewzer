import { useRef, useState, useEffect } from 'react'
import { Pause } from '../types'

export const usePausesInForm = (initialState: Pause[]) => {
  const [pauses, setPauses] = useState<Pause[]>(initialState)

  useEffect(() => {
    setPauses(initialState)
  }, [initialState])

  const temp = useRef<HTMLInputElement>(null)
  const time = useRef<HTMLInputElement>(null)

  const compareTemps = (a: Pause, b: Pause) => {
    return a.temp - b.temp
  }

  const addPause = () => {
    if (
      temp.current !== null &&
      time.current !== null &&
      temp.current.valueAsNumber >= 0 &&
      time.current.valueAsNumber > 0
    ) {
      const tempValue = temp.current.valueAsNumber
      const timeValue = time.current.valueAsNumber

      setPauses((prev) =>
        prev
          .concat([
            {
              temp: tempValue,
              time: timeValue,
            },
          ])
          .sort(compareTemps),
      )

      temp.current.value = ''
      time.current.value = ''

      temp.current.focus()
    }
  }

  const deletePause = (idx: number) => {
    let buf = pauses

    buf.splice(idx, 1)

    setPauses(buf.slice())
  }

  return {
    pauses: {
      data: pauses,
      add: addPause,
      delete: deletePause,
    },
    pausesRefs: {
      temp,
      time,
    },
  }
}

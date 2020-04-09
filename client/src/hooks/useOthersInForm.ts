import { useState, useRef, useEffect } from 'react'

import { Other, WhenOther } from '../types'

export const useOthersInForm = (initialState: Other[]) => {
  const [others, setOthers] = useState<Other[]>(initialState)

  useEffect(() => {
    setOthers(initialState)
  }, [initialState])

  const [other, setOther] = useState<Other>({
    name: '',
    weight: '',
    when: '',
  })

  const name = useRef<HTMLInputElement>(null)

  const compareWhen = (a: Other, b: Other) => {
    const arrayFromEnum = Object.values(WhenOther)

    return (
      arrayFromEnum.indexOf(a.when as WhenOther) -
      arrayFromEnum.indexOf(b.when as WhenOther)
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()

    setOther((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const add = () => {
    if (other.name && other.weight > 0 && other.when) {
      setOthers((prev) => prev.concat([other]).sort(compareWhen))
      setOther({
        name: '',
        weight: '',
        when: '',
      })

      if (name.current !== null) name.current.focus()
    }
  }

  const del = (idx: number) => {
    let buf = others

    buf.splice(idx, 1)

    setOthers(buf.slice())
  }

  return {
    others: {
      data: others,
      add,
      delete: del,
      handleChange,
      current: other,
    },
    othersRefs: {
      name,
    },
  }
}

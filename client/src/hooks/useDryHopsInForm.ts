import { useState, useRef, useEffect } from 'react'

import { DryHop } from '../types'

export const useDryHopsInForm = (initialState: DryHop[]) => {
  const [dryHops, setDryHops] = useState<DryHop[]>(initialState)

  useEffect(() => {
    setDryHops(initialState)
  }, [initialState])

  const [dryHop, setDryHop] = useState<DryHop>({
    name: '',
    weight: '',
    when: '',
  })

  const name = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()

    setDryHop((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const add = () => {
    if (dryHop.name && dryHop.weight > 0 && dryHop.when) {
      setDryHops((prev) => prev.concat([dryHop]))
      setDryHop({
        name: '',
        weight: '',
        when: '',
      })

      if (name.current !== null) name.current.focus()
    }
  }

  const del = (idx: number) => {
    let buf = dryHops

    buf.splice(idx, 1)

    setDryHops(buf.slice())
  }

  return {
    dryHops: {
      data: dryHops,
      add,
      handleChange,
      current: dryHop,
      delete: del,
    },
    dryHopsRefs: {
      name,
    },
  }
}

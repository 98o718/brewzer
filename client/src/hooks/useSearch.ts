import { useState, useRef } from 'react'
import { RecipeDescription, PaginateResult } from '../types'
import axios from 'axios'

type DataType = {
  title: string
  style: string
  rating: string
  sort: string
  abv: number | ''
  ibu: number | ''
  og: number | ''
}

export const useSearch = () => {
  const [recipes, setRecipes] = useState<PaginateResult<RecipeDescription>>()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [info, setInfo] = useState<DataType>({
    title: '',
    style: '',
    sort: '-rating',
    rating: '0',
    abv: '',
    ibu: '',
    og: '',
  })

  const headingRef = useRef<HTMLDivElement>(null)

  const [grains, setGrains] = useState<string[]>([])
  const [exactGrains, setExactGrains] = useState(false)
  const grainRef = useRef<HTMLInputElement>(null)

  const [hops, setHops] = useState<string[]>([])
  const [exactHops, setExactHops] = useState(false)
  const hopRef = useRef<HTMLInputElement>(null)

  const [others, setOthers] = useState<string[]>([])
  const [exactOthers, setExactOthers] = useState(false)
  const otherRef = useRef<HTMLInputElement>(null)

  const [yeasts, setYeasts] = useState<string[]>([])
  const yeastRef = useRef<HTMLInputElement>(null)

  const addGrain = () => {
    if (grainRef.current !== null && grainRef.current.value !== '') {
      const value = grainRef.current.value.trim()

      setGrains((prev) => prev.concat([value]))

      grainRef.current.value = ''

      grainRef.current.focus()
    }
  }

  const deleteGrain = (idx: number) => {
    let buf = grains

    buf.splice(idx, 1)

    setGrains(buf.slice())
  }

  const handleExactGrains = () => {
    setExactGrains((prev) => !prev)
  }

  const addHop = () => {
    if (hopRef.current !== null && hopRef.current.value !== '') {
      const value = hopRef.current.value.trim()

      setHops((prev) => prev.concat([value]))

      hopRef.current.value = ''

      hopRef.current.focus()
    }
  }

  const deleteHop = (idx: number) => {
    let buf = hops

    buf.splice(idx, 1)

    setHops(buf.slice())
  }

  const handleExactHops = () => {
    setExactHops((prev) => !prev)
  }

  const addOther = () => {
    if (otherRef.current !== null && otherRef.current.value !== '') {
      const value = otherRef.current.value.trim()

      setOthers((prev) => prev.concat([value]))

      otherRef.current.value = ''

      otherRef.current.focus()
    }
  }

  const deleteOther = (idx: number) => {
    let buf = others

    buf.splice(idx, 1)

    setOthers(buf.slice())
  }

  const handleExactOthers = () => {
    setExactOthers((prev) => !prev)
  }

  const addYeast = () => {
    if (yeastRef.current !== null && yeastRef.current.value !== '') {
      const value = yeastRef.current.value.trim()

      setYeasts((prev) => prev.concat([value]))

      yeastRef.current.value = ''

      yeastRef.current.focus()
    }
  }

  const deleteYeast = (idx: number) => {
    let buf = yeasts

    buf.splice(idx, 1)

    setYeasts(buf.slice())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setInfo((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: Math.abs(e.target.valueAsNumber) || e.target.value,
      }),
    )
  }

  const handleSubmit = (p?: number) => {
    setPage(p ? p : 1)
    setLoading(true)
    axios
      .post(
        process.env.REACT_APP_RECIPES_SEARCH_URL!,
        Object.assign({}, info, {
          grains,
          exactGrains,
          hops,
          exactHops,
          others,
          exactOthers,
          yeasts,
          page: p ? p : 1,
        }),
      )
      .then(({ data }) => {
        setRecipes(data)
        setLoading(false)
        if (headingRef.current !== null) {
          window.scroll(0, headingRef.current.offsetTop - 65)
        }
      })
      .catch(() => {})
  }

  return {
    recipes,
    page,
    info,
    handleChange,
    grains,
    grainRef,
    addGrain,
    deleteGrain,
    exactGrains,
    handleExactGrains,
    hops,
    hopRef,
    addHop,
    deleteHop,
    exactHops,
    handleExactHops,
    others,
    otherRef,
    addOther,
    deleteOther,
    exactOthers,
    handleExactOthers,
    yeasts,
    yeastRef,
    addYeast,
    deleteYeast,
    handleSubmit,
    loading,
    headingRef,
  }
}

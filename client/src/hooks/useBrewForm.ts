import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateBrew, BrewDescription } from '../types'
import axios from 'axios'
import { roundToNearestMinutes, addDays } from 'date-fns'

type useBrewFormProps = {
  id: string
  volume?: number
  edit?: boolean
}

export const useBrewForm = ({ id, volume, edit = false }: useBrewFormProps) => {
  const history = useHistory()
  const [isLoading, setLoading] = useState(true)
  const [isSending, setSending] = useState(false)
  const [brew, setBrew] = useState<CreateBrew | BrewDescription>({
    recipe: id,
    title: '',
    comment: '',
    brewDate: roundToNearestMinutes(new Date(), { nearestTo: 15 }),
    bottlingDate: roundToNearestMinutes(addDays(new Date(), 1), {
      nearestTo: 30,
    }),
  } as CreateBrew)

  useEffect(() => {
    if (volume && !edit) {
      setBrew((prev) => Object.assign({}, prev, { volume }))
    }
  }, [volume, edit])

  useEffect(() => {
    if (!edit) {
      axios
        .get(`${process.env.REACT_APP_RECIPES_URL}/${id}`)
        .then(({ data }) => {
          setBrew((prev) => ({ ...prev, title: data.title }))
          setLoading(false)
        })
    } else {
      axios.get(`${process.env.REACT_APP_BREWS_URL}/${id}`).then(({ data }) => {
        setBrew(data)
        setLoading(false)
      })
    }
  }, [id, edit])

  const setDate = (date: Date | null, dateType: string) => {
    setBrew((prev) =>
      Object.assign({}, prev, {
        [dateType]: date,
      }),
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setBrew((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const handleSubmit = async () => {
    if (
      brew.bottlingDate &&
      new Date(brew.bottlingDate) < new Date(brew.brewDate)
    ) {
      return toast.error('Дата розлива должна быть позже даты варки!')
    }

    if (brew.fg === '') {
    }

    setSending(true)

    try {
      await axios(
        edit
          ? `${process.env.REACT_APP_BREWS_URL}/${id}`
          : process.env.REACT_APP_BREWS_URL!,
        {
          method: edit ? 'PATCH' : 'POST',
          data: brew,
        },
      )

      toast.success('Варка добавлена!')
      history.push('/my-brews')
    } catch {
      toast.error('Ошибка добавления!')
      setLoading(false)
    }
  }

  return {
    id,
    isLoading,
    isSending,
    brew,
    setDate,
    handleChange,
    handleSubmit,
    edit,
  }
}

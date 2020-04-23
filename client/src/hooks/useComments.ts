import { useState, useCallback } from 'react'
import { useFetch } from './useFetch'
import { CommentDescription, PaginateResult } from '../types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAtom } from '@reatom/react'
import { userAtom } from '../model'

export const useComments = (id: string) => {
  const user = useAtom(userAtom)
  const [page, setPage] = useState(1)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [data, loading, error, reload] = useFetch<
    PaginateResult<CommentDescription>
  >(process.env.REACT_APP_COMMENTS_URL!, `${id}/${page}`)

  const changePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setText(e.target.value)
  }

  const handleSubmit = () => {
    setSending(true)
    axios(process.env.REACT_APP_COMMENTS_URL!, {
      method: 'POST',
      data: {
        entity: id,
        text,
      },
    })
      .then(() => {
        toast.success('Комментарий добавлен')
        setText('')
        axios
          .get(`${process.env.REACT_APP_COMMENTS_URL}/${id}/1`)
          .then(({ data }) => {
            setSending(false)
            if (data.totalPages === page) {
              reload()
            } else {
              setPage(data.totalPages)
            }
          })
      })
      .catch(() => {
        setSending(false)
        toast.error('Ошибка добавления')
      })
  }

  const handleDelete = (id: string) => {
    axios(process.env.REACT_APP_COMMENTS_URL!, {
      method: 'DELETE',
      data: { id },
    })
      .then(() => {
        reload()
      })
      .catch(() => {
        toast.error('Ошибка удаления')
      })
  }

  if (data !== undefined) {
    return {
      comments: data.docs,
      changePage,
      changeText,
      text,
      loading,
      error,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      current: data.page,
      last: data.totalPages,
      handleSubmit,
      handleDelete,
      sending,
      username: user === null ? undefined : user.username,
    }
  }

  return {
    comments: undefined,
    changePage,
    changeText,
    text,
    loading,
    error,
    prevPage: null,
    nextPage: null,
    current: 1,
    last: 1,
    handleSubmit,
    handleDelete,
    sending,
    username: user === null ? undefined : user.username,
  }
}

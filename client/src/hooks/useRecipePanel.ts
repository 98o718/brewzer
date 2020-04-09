import { useState, useEffect, useCallback } from 'react'
import { useAtom } from '@reatom/react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import copy from 'copy-to-clipboard'

import { RecipeDescription, RecipeAccessType } from '../types'
import { userAtom } from '../model'
import { fetchRefresh } from '../utils'

export const useRecipePanel = (
  recipe: RecipeDescription | undefined,
  handleLoad: () => void,
) => {
  const [canVote, setCanVote] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [volume, setVolume] = useState<number | ''>('')
  const [isAuthor, setIsAuthor] = useState(false)
  const [isAuthorized, setAuthorized] = useState(false)
  const [voting, setVoting] = useState(false)
  const user = useAtom(userAtom)
  const history = useHistory()

  useEffect(() => {
    if (recipe !== undefined) {
      setCanVote(recipe.canVote || false)
      if (user !== null) {
        setIsAuthor(user.sub === recipe.userId)
        setAuthorized(true)
      } else {
        setIsAuthor(false)
        setAuthorized(false)
      }
    }
  }, [recipe, user])

  useEffect(() => {
    if (recipe !== undefined && volume !== '') {
      setMultiplier(volume / recipe.volume)
    } else {
      setMultiplier(1)
    }
  }, [volume, recipe])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Math.abs(e.target.valueAsNumber) || '')
  }

  const handleEdit = useCallback(() => {
    if (recipe !== undefined) history.push(`/edit-recipe/${recipe._id}`)
  }, [recipe, history])

  const handleBrew = useCallback(() => {
    if (recipe !== undefined) history.push(`/add-brew/${recipe._id}/${volume}`)
  }, [recipe, history, volume])

  const handleCopy = useCallback(() => {
    if (recipe !== undefined) history.push(`/copy-recipe/${recipe._id}`)
  }, [recipe, history])

  const handlePrint = useCallback(() => {
    if (recipe !== undefined) window.print()
  }, [recipe])

  const handleShare = useCallback(() => {
    if (recipe !== undefined)
      copy(
        recipe.access === RecipeAccessType.URL
          ? `${window.origin}/recipes/private/${recipe.url}`
          : window.location.href,
      )
  }, [recipe])

  const handleDelete = useCallback(() => {
    if (recipe !== undefined)
      fetchRefresh(`${process.env.REACT_APP_RECIPES_URL}/${recipe._id}`, {
        method: 'DELETE',
      }).then(({ ok }) => {
        if (ok) {
          history.push('/')
          toast.success('Рецепт удален')
        } else {
          toast.error('Ошибка удаления!')
        }
      })
  }, [recipe, history])

  const vote = useCallback(
    (value: number) => {
      if (canVote && recipe !== undefined) {
        setVoting(true)
        fetchRefresh(
          `${process.env.REACT_APP_RECIPES_RATE_URL}/${recipe._id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              vote: value,
            }),
          },
        )
          .then(({ ok }) => {
            setVoting(false)
            if (ok) {
              setCanVote(false)
              toast.success('Ваш голос учтен!')
              handleLoad()
            } else {
              toast.error('Ошибка голосования! Попробуйте позже')
            }
          })
          .catch((e) => {
            setVoting(false)
            toast.error('Ошибка голосования! Попробуйте позже')
          })
      }
    },
    [recipe, canVote, handleLoad],
  )

  return {
    canVote,
    isAuthor,
    isAuthorized,
    voting,
    vote,
    volume,
    multiplier,
    handleEdit,
    handleDelete,
    handleBrew,
    handleCopy,
    handlePrint,
    handleShare,
    handleChange,
  }
}

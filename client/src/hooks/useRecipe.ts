import { useState, useEffect, useCallback } from 'react'

import { RecipeDescription, RecipeType } from '../types'
import { fetchRefresh } from '../utils'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useRecipe = (id: string, type: RecipeType = RecipeType.PUBLIC) => {
  const [recipe, setRecipe] = useState<RecipeDescription>()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const handleLoad = useCallback(() => {
    fetchRefresh(
      type === RecipeType.PUBLIC
        ? `${process.env.REACT_APP_RECIPES_URL}/${id}`
        : `${process.env.REACT_APP_PRIVATE_RECIPES_URL}/${id}`,
    ).then(({ ok, data }) => {
      if (ok) {
        setRecipe(data)
        setLoading(false)
      } else {
        toast.error('Рецепт не найден или был удален')
        history.push('/')
      }
    })
  }, [id, history, type])

  useEffect(() => {
    setLoading(true)
    handleLoad()
  }, [id, handleLoad])

  return { recipe, loading, handleLoad }
}

import { useState, useEffect } from 'react'
import { RecipeType, Recipe, RecipeAccessType, Hop } from '../types'
import { ibuCalculator, abvCalculator, fetchRefresh } from '../utils'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { useGrainsInForm } from './useGrainsInForm'
import { useHopsInForm } from './useHopsInForm'
import { usePausesInForm } from './usePausesInForm'
import { useYeastInForm } from './useYeastInForm'
import { useFormValidation } from './useFormValidation'
import { useDryHopsInForm } from './useDryHopsInForm'
import { useOthersInForm } from './useOthersInForm'

export enum RecipeFormType {
  CREATE,
  EDIT,
  COPY,
}

export const useRecipeForm = (
  id?: string,
  type: RecipeFormType = RecipeFormType.CREATE,
) => {
  const history = useHistory()

  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    description: '',
    details: '',
    style: '',
    mashWater: '',
    flushingWater: '',
    volume: '',
    batchVolume: '',
    abv: '',
    ibu: '',
    og: '',
    fg: '',
    recipeType: RecipeType.PUBLIC,
    pauses: [],
    ingredients: {
      hops: [],
      grains: [],
      yeast: null,
      others: [],
      dryHops: [],
    },
  })

  useEffect(() => {
    if (type !== RecipeFormType.CREATE && id) {
      fetchRefresh(`${process.env.REACT_APP_RECIPES_URL}/${id}`).then(
        ({ ok, data }) => {
          if (ok) {
            if (type === RecipeFormType.COPY) {
              delete data._id
              delete data.rating
              delete data.votes
              delete data.userId
              delete data.__v
              delete data.canVote
              delete data.created_at
              delete data.updated_at
            }
            setRecipe(data)
            setLoading(false)
          }
        },
      )
    }
  }, [id, type])

  const { grains, grainsRefs } = useGrainsInForm(recipe.ingredients.grains)
  const { hops, hopsRefs } = useHopsInForm(recipe.ingredients.hops)
  const { dryHops, dryHopsRefs } = useDryHopsInForm(recipe.ingredients.dryHops)
  const { pauses, pausesRefs } = usePausesInForm(recipe.pauses)
  const { yeast, yeastRefs } = useYeastInForm(recipe.ingredients.yeast)
  const { others, othersRefs } = useOthersInForm(recipe.ingredients.others)

  const [loading, setLoading] = useState(!!(type !== RecipeFormType.CREATE))

  const calculateIbu = (hop: Hop) => {
    if (recipe.og && recipe.volume && recipe.batchVolume) {
      return (
        ibuCalculator(
          recipe.og as number,
          recipe.volume as number,
          recipe.batchVolume as number,
          [hop],
        ) | 0
      )
    } else {
      return 0
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setRecipe((prev) =>
      Object.assign({}, prev, {
        [e.target.name]: e.target.valueAsNumber || e.target.value,
      }),
    )
  }

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (e.target.checked) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          recipeType: RecipeType.PRIVATE,
          access: RecipeAccessType.USER_ONLY,
        }),
      )
    } else {
      setRecipe((prev) => {
        delete prev.access
        return Object.assign({}, prev, {
          recipeType: RecipeType.PUBLIC,
        })
      })
    }
  }

  const handleUrlAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (e.target.checked && recipe.recipeType === RecipeType.PRIVATE) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          access: RecipeAccessType.URL,
        }),
      )
    } else {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          access: RecipeAccessType.USER_ONLY,
        }),
      )
    }
  }

  useEffect(() => {
    setRecipe((prev) =>
      Object.assign({}, prev, {
        pauses: pauses.data,
        ingredients: {
          grains: grains.data,
          hops: hops.data,
          dryHops: dryHops.data,
          yeast: yeast.data,
          others: others.data,
        },
      }),
    )
  }, [
    grains.data,
    hops.data,
    dryHops.data,
    yeast.data,
    pauses.data,
    others.data,
  ])

  const [autoIbuCalc, setAutoIbuCalc] = useState(true)
  const [autoAbvCalc, setAutoAbvCalc] = useState(true)

  useEffect(() => {
    if (
      autoIbuCalc &&
      recipe.batchVolume > 0 &&
      hops.data.length > 0 &&
      recipe.volume > 0 &&
      recipe.og > 0
    ) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          ibu:
            ibuCalculator(
              recipe.og as number,
              recipe.volume as number,
              recipe.batchVolume! as number,
              hops.data,
            ) | 0,
        }),
      )
    } else if (autoIbuCalc) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          ibu: 0,
        }),
      )
    }
  }, [hops.data, recipe.volume, recipe.og, recipe.batchVolume, autoIbuCalc])

  useEffect(() => {
    if (autoAbvCalc && recipe.og > 0 && recipe.fg >= 0) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          abv: abvCalculator(recipe.og as number, recipe.fg as number),
        }),
      )
    } else if (autoAbvCalc && (recipe.og < 0 || recipe.fg < 0)) {
      setRecipe((prev) =>
        Object.assign({}, prev, {
          abv: 0,
        }),
      )
    }
  }, [recipe.og, recipe.fg, autoAbvCalc])

  const { isValid, message } = useFormValidation(recipe)

  const handleSubmit = async () => {
    if (isValid) {
      setLoading(true)

      const response = await fetchRefresh(
        type === RecipeFormType.EDIT && id
          ? `${process.env.REACT_APP_RECIPES_URL}/${id}`
          : type === RecipeFormType.COPY
          ? process.env.REACT_APP_COPY_RECIPES_URL!
          : process.env.REACT_APP_RECIPES_URL!,
        {
          method: type === RecipeFormType.EDIT && id ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        },
      )

      setLoading(false)

      if (response.ok) {
        toast.success('Рецепт сохранен!')
        history.push(
          `/recipes/${type === RecipeFormType.EDIT ? id : response.data.id}`,
        )
      } else {
        toast.error('Ошибка сохранения!')
      }
    } else {
      toast.error(message)
    }
  }

  return {
    handleSwitch,
    calculateIbu,
    recipe,
    handleUrlAccess,
    handleChange,
    autoAbvCalc,
    setAutoAbvCalc,
    setAutoIbuCalc,
    autoIbuCalc,
    grains,
    grainsRefs,
    hops,
    hopsRefs,
    dryHops,
    dryHopsRefs,
    yeast,
    yeastRefs,
    others,
    othersRefs,
    pauses,
    pausesRefs,
    handleSubmit,
    loading,
    type,
  }
}

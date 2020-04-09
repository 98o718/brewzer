import { Recipe } from '../types'

export const useFormValidation = (recipe: Recipe) => {
  if (recipe.title === '') {
    return { isValid: false, message: 'Название не должно быть пустым!' }
  } else if (!recipe.volume) {
    return { isValid: false, message: 'Укажите объем партии!' }
  } else if (!recipe.abv) {
    return { isValid: false, message: 'Укажите содержание алкоголя!' }
  } else if (!recipe.ibu) {
    return { isValid: false, message: 'Укажите IBU!' }
  } else if (recipe.ibu < 0) {
    return { isValid: false, message: 'IBU должно быть >= 0!' }
  } else if (!recipe.og) {
    return { isValid: false, message: 'Укажите начальную плотность!' }
  } else if (!recipe.fg) {
    return { isValid: false, message: 'Укажите конечную плотность!' }
  } else if (recipe.og < recipe.fg) {
    return {
      isValid: false,
      message: 'Начальная плотность должна быть больше конечной!',
    }
  } else if (recipe.abv < 0) {
    return { isValid: false, message: 'Содержание алкоголя должно быть >= 0!' }
  } else if (recipe.og < 0) {
    return { isValid: false, message: 'Начальная плотность должна быть >= 0!' }
  } else if (recipe.fg < 0) {
    return { isValid: false, message: 'Конечная плотность должна быть >= 0!' }
  } else if (recipe.ingredients.grains.length === 0) {
    return {
      isValid: false,
      message: 'Зерновые должны содержать хотя бы 1 ингредиент!',
    }
  } else if (recipe.ingredients.hops.length === 0) {
    return {
      isValid: false,
      message: 'Хмель должен содержать хотя бы 1 ингредиент!',
    }
  } else if (recipe.ingredients.yeast === null) {
    return { isValid: false, message: 'Добавьте дрожжи!' }
  } else if (recipe.pauses.length === 0) {
    return { isValid: false, message: 'Должна быть хотя бы 1 пауза!' }
  } else {
    return { isValid: true, message: null }
  }
}

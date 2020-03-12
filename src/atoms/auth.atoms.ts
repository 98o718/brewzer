import { declareAtom } from '@reatom/core'
import Cookies from 'universal-cookie'

import { signIn, logout } from '../actions/auth.actions'

// // currentText atom manages data of the currently inputted text
// export const currentText = declareAtom('', on => [
//   // this action listener will ensure new value of the inputted text is saved to the store
//   on(inputText, (state, value) => value),
//   // this action listener will clear the input textbox after todo has been created
//   on(addTodo, () => ''),
// ])
const cookies = new Cookies()

export const authAtom = declareAtom(['isAuth'], false, on => [
  on(signIn, () => true),
  on(logout, () => {
    cookies.remove('token')
    return false
  }),
])

export const usernameAtom = declareAtom<string>(['username'], '', on => [
  on(signIn, (state, value) => value.username),
])

export const avatarAtom = declareAtom<string>(['avatar'], '', on => [
  on(signIn, (state, value) => value.avatar),
])

// // todoList atom manages data of all the stored todos
// export const todoList = declareAtom(
//   // first argument allows us to set the initial value
//   // for demo purposes it has 2 pre-filled todos
//   [
//     {
//       id: 0,
//       text: 'Take over the world',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Create simple demo',
//       completed: true,
//     },
//   ],
//   on => [
//     // action listener to add new todo information to the list on "addTodo" action trigger
//     on(addTodo, (state, value) => {
//       return [
//         ...state,
//         {
//           id: state.length,
//           text: value,
//           completed: false,
//         },
//       ]
//     }),
//     // action listener to change a todo status active <-> completed
//     on(toggleStatus, (state, index) =>
//       state.map((todo, i) => {
//         if (i === index) {
//           return {
//             ...todo,
//             completed: !todo.completed,
//           }
//         }
//         return todo
//       })
//     ),
//   ]
// )

// // activeTodoList atom builds on top of the todoList atom and filters its data
// // to include only active todos
// export const activeTodoList = map(todoList, state =>
//   state.filter(todo => !todo.completed)
// )

// // completedTodoList atom builds on top of the todoList atom and filters its data
// // to include only completed todos
// export const completedTodoList = map(todoList, state =>
//   state.filter(todo => todo.completed)
// )

// // `map` is a helper Reatom Core function to declare derivative atoms
// // with custom data formatting

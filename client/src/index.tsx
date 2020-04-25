import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from '@reatom/core'
import { setupInterceptors } from './utils/setupInterceptors'
import { Provider } from '@reatom/react'
import localforage from 'localforage'

localforage.getItem('app_store').then((value) => {
  const store = createStore(JSON.parse(`${value}`) || {})

  setupInterceptors(store)

  ReactDOM.render(
    <Provider value={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root'),
  )
})

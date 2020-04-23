import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from '@reatom/core'
import { setupInterceptors } from './utils/setupInterceptors'
import { Provider } from '@reatom/react'

const store = createStore(
  JSON.parse(`${localStorage.getItem('app_store')}`) || {},
)

setupInterceptors(store)

ReactDOM.render(
  <Provider value={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
)

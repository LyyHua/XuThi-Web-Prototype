import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import './app/layout/styles.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)

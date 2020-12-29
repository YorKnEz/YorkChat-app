import React from 'react'
import ReactDOM from 'react-dom'

const render = () => {
  const App = require('./App').default

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

render()
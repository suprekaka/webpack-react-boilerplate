import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

import './style/index.scss'

const wrapper = global.document.querySelector('#root')

function run() {
  render(
    <Root />,
    wrapper,
  )
}

run()

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/Root', run)
}

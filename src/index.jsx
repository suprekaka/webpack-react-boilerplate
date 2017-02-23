import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

require('./style/index.scss')

const wrapper = global.document.querySelector('#root')

render(
  <Root />,
  wrapper,
)

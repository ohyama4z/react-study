import React from 'react'

import '../assets/Tutorial.css'
import { SquareValue } from '../views/Tutorial'

interface SquareProps {
  value: SquareValue
  onClick: () => void
}

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square
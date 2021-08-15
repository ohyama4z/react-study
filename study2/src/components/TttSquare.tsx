import React from 'react'

import '../assets/Tutorial.css'
import { SquareValue } from '../views/TicTacToe'

interface SquareProps {
  value: SquareValue
  onClick: () => void
}

const TttSquare: React.FC<SquareProps> = (props) => {
  return (
    <button className='tttSquare' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default TttSquare
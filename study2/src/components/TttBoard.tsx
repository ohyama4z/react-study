import React from 'react'

import '../assets/Tutorial.css'
import TttSquare from './TttSquare'
import { SquareValue } from '../views/TicTacToe'

interface BoardProps {
  squares: SquareValue[]
  onClick: (i: number) => void
}

const TttBoard: React.FC<BoardProps> = (props) => {
  const renderSquare = (i: number) => {
    return (
      <TttSquare
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    )
  }

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default TttBoard

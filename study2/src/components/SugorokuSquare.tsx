import React from 'react'
import '../assets/Sugoroku.css'

interface SquareProps {
  index: number
  playerName: string
}

const SugorokuSquare: React.FC<SquareProps> = (props) => {
  return (
    <div className='sugorokuSquare'>
      <div>{props.index}</div>
      <div className='sugorkuPlayerName'>{props.playerName}</div>
    </div>
  )
}

export default SugorokuSquare
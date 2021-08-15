import React from 'react'
import Square from './SugorokuSquare'

import '../assets/Sugoroku.css'

interface BoardProps {
  squareNum: number
  players: { name: string, position: number }[]
}

const Board: React.FC<BoardProps> = (props) => {
  const renderCourse = (squareNum: number, player: BoardProps['players'][number]) => {
    return [...Array(squareNum)].map((_, index) => {
      const playerName = index + 1 === player.position ? player.name : ``
      return (
        <div key={`${player.name}_${index}`}>
          <Square index={index + 1} playerName={playerName} />
        </div>
      )
    })
  }

  const courses = props.players.map((player) => {
    return (
      <div className='sugorokuBoard' key={player.name}>{player.name}{renderCourse(props.squareNum, player)}</div>
    )
  })

  return (
    <div className='sugorokuBoards'>
      {courses}
    </div>
  )
}

export default Board
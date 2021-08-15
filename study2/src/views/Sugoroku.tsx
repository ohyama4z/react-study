import React, { useState } from 'react'
import Form from '../components/SugorokuForm'
import Board from '../components/SugorokuBoard'

const Sugoroku: React.FC<{}> = (props) => {
  interface Player {
    name: string
    position: number
    rank: number | null
  }

  const [players, setPlayers] = useState<Player[]>([])
  const [courseLength, setCourseLength] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<`entering` | `playingGame` | `finishedGame`>(`entering`)

  const addPlayer = (name: string): void => {
    setPlayers(
      [...players,
        {
          name,
          position: 1,
          rank: null
        }]
    )
  }

  const startGame = (courseLength: number): void => {
    setCourseLength(courseLength)
    setGameStatus(`playingGame`)
  }

  const form = () => {
    const playerNameList = players.map(({ name }) => {return <div>{name}</div>})
    if (gameStatus === `entering`) {
      return (
        <div>
          <Form addPlayer={addPlayer} startGame={startGame} />
          <div style={{ fontWeight: `bold` }}>参加するプレイヤー</div>
          {playerNameList}
        </div>
      )
    }

    return false
  }

  return (
    <div>
      {form()}
      {
        gameStatus !== `entering` &&
        <Board squareNum={courseLength} players={players} />
      }
    </div>
  )
}

export default Sugoroku
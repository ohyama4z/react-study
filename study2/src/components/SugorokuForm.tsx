import React, { useState } from 'react'

interface FormProps {
  addPlayer: (name: string) => void
  startGame: (courseLength: number) => void
}

const Form: React.FC<FormProps> = (props) => {
  const [inputName, setInputName] = useState<string>(``)
  const [inputCourseLength, setInputCourseLength] = useState<string>(``)

  return (
    <div>
      <div>
        コースの長さを入力:
        <input
          type='text'
          value={inputCourseLength}
          onChange={(e) => setInputCourseLength(e.target.value)}
        />
      </div>
      <div>
        名前を入力:
        <input
          type='text'
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            props.addPlayer(inputName)
            setInputName(``)
          }}
        >
          プレイヤーを追加
        </button>
        <button
          onClick={() => {
            props.startGame(Number(inputCourseLength))
            setInputCourseLength(``)
            setInputName(``)
          }}
        >
          ゲームスタート
        </button>
      </div>
    </div>
  )
}

export default Form
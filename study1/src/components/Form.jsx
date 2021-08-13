import React from "react";
import "./Sugoroku.css";

export default function Form(props) {
  const nameForm = props.players.map(({ name }, i) => (
    <div key={i}>
      <input
        type="text"
        value={name}
        onChange={(event) => props.handleChangePlayer(i, event)}
      />
    </div>
  ));

  return (
    <div>
      <div>
        コースの長さを入力
        <div>
          <input
            type="text"
            value={props.boardLength}
            onChange={(event) => props.handleChangeLength(event)}
          />
        </div>
      </div>
      <div>
        名前を入力
        {nameForm}
      </div>
      <div>
        <button onClick={() => props.addPlayer()}>プレイヤーを追加</button>
        <button onClick={() => props.startGame()}>ゲームスタート</button>
      </div>
    </div>
  );
}

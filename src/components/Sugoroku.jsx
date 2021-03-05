import React from "react";
import "./Sugoroku.css";

const Square = (props) => {
  return (
    <div className="square">
      {props.index}
      <div className="playerName">{props.playerName}</div>
    </div>
  );
};

const Board = (props) => {
  const renderNSquare = (squareNum) => {
    return [...Array(squareNum).keys()].map((index) => {
      const playerName =
        props.player.position === index ? props.player.name : null;
      return (
        <div key={`${index}`}>
          <Square index={index} playerName={playerName} />
        </div>
      );
    });
  };

  return <div className="board">{renderNSquare(props.squareNum)}</div>;
};

const Form = (props) => {
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
            type="number"
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
};

export default class Sugoroku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        {
          name: "",
          position: 0,
        },
      ],
      boardLength: null,
      isStarted: false,
    };

    this.handleChangePlayer = this.handleChangePlayer.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
  }

  renderBoards() {
    return this.state.players.map((player, i) => {
      return (
        <div>
          <div>{`${i + 1}: ${player.name}`}</div>
          <Board squareNum={this.state.boardLength} player={player} />
        </div>
      );
    });
  }

  addPlayer() {
    this.setState({
      players: [...this.state.players, { name: "", position: 0 }],
    });
  }

  handleChangePlayer(i, event) {
    const playersCopy = this.state.players.slice();
    playersCopy[i].name = event.target.value;
    this.setState({
      players: playersCopy,
    });
  }

  handleChangeLength(event) {
    this.setState({
      boardLength: Number(event.target.value),
    });
  }

  startGame() {
    this.setState({ isStarted: true });
  }

  endGame() {
    this.setState({
      players: [
        {
          name: "",
          position: 0,
        },
      ],
      boardLength: null,
      isStarted: false,
    });
  }

  render() {
    if (this.state.isStarted) {
      return (
        <div>
          <button onClick={() => this.endGame()}>ゲームを終える</button>
          <div className="boards">{this.renderBoards()}</div>
        </div>
      );
    }

    return (
      <div>
        <Form
          handleChangePlayer={this.handleChangePlayer}
          handleChangeLength={this.handleChangeLength}
          players={this.state.players}
          boardLength={this.state.boardLength}
          addPlayer={() => this.addPlayer()}
          startGame={() => this.startGame()}
        />
      </div>
    );
  }
}

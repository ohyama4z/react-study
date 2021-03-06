import React from "react";
import "./Sugoroku.css";
import Board from "./Board";
import Form from "./Form";

export default class Sugoroku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        {
          name: "",
          position: 0,
          goaled: false,
          rank: null,
        },
      ],
      boardLength: null,
      gameStatus: "entering",
      curPlayerIdx: 0,
      goaledPlayers: 0,
      diceIdx: null,
    };
  }

  renderBoards() {
    return this.state.players.map((player, i) => {
      const rank = player.goaled ? <div>{player.rank}位!</div> : null;
      return (
        <div>
          <div>{`${i + 1}: ${player.name}`}</div>
          {rank}
          <Board squareNum={this.state.boardLength} player={player} />
        </div>
      );
    });
  }

  addPlayer = () => {
    this.setState({
      players: [
        ...this.state.players,
        { name: "", position: 0, goaled: false, rank: null },
      ],
    });
  };

  handleChangePlayer = (i, event) => {
    const playersCopy = this.state.players.slice();
    playersCopy[i].name = event.target.value;
    this.setState({
      players: playersCopy,
    });
  };

  handleChangeLength = (event) => {
    this.setState({
      boardLength: Number(event.target.value),
    });
  };

  startGame = () => {
    this.setState({ isStarted: true, gameStatus: "started" });
  };

  finishGame = () => {
    this.setState({
      players: [
        {
          name: "",
          position: 0,
          goaled: false,
          rank: null,
        },
      ],
      boardLength: null,
      isStarted: false,
      gameStatus: "entering",
      curPlayerIdx: 0,
      goaledPlayers: 0,
    });
  };

  rollDice = () => {
    const diceIdx = Math.floor(Math.random() * 6) + 1;
    const playersCopy = this.state.players.slice();
    playersCopy[this.state.curPlayerIdx].position =
      this.state.position + diceIdx;

    if (
      playersCopy[this.state.curPlayerIdx].position >
      this.state.boardLength - 1
    ) {
      this.goal();
    }

    this.setState((state) => ({
      diceIdx: diceIdx,
      players: playersCopy,
      curPlayerIdx:
        state.curPlayerIdx === state.players.length - 1
          ? 0
          : state.curPlayerIdx + 1,
    }));
  };

  render() {
    if (
      this.state.gameStatus === "entering" ||
      this.state.gameStatus === "finished"
    ) {
      return (
        <div>
          <Form
            handleChangePlayer={this.handleChangePlayer}
            handleChangeLength={this.handleChangeLength}
            players={this.state.players}
            boardLength={this.state.boardLength}
            addPlayer={this.addPlayer}
            startGame={this.startGame}
          />
        </div>
      );
    }

    if (this.state.gameStatus === "started") {
      return (
        <div>
          <div>
            <button onClick={this.finishGame}>ゲームを終える</button>
          </div>

          <div>{this.state.players[0].name}の手番</div>
          <div>
            <button onClick={this.rollDice}>サイコロを回す</button>
          </div>
          <div>サイコロの目: {this.state.diceIdx}</div>
          <div className="boards">{this.renderBoards()}</div>
        </div>
      );
    }
  }
}

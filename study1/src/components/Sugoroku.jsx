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
      boardLength: "",
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
        <div key={`${player.name}_${i}`}>
          <div>{`${i + 1}: ${player.name}`}</div>
          {rank}
          <Board squareNum={Number(this.state.boardLength)} player={player} />
        </div>
      );
    });
  }

  renderDice() {
    return this.state.gameStatus === "started" ? (
      <div>
        <div>{this.state.players[this.state.curPlayerIdx].name}の手番</div>
        <div>
          <button onClick={this.rollDice}>サイコロを回す</button>
        </div>
      </div>
    ) : null;
  }

  renderGoalText() {
    return this.state.gameStatus === "finished" ? (
      <div className="goalText">ゴーーーーーーーーール!!!!</div>
    ) : null;
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
      boardLength: event.target.value,
    });
  };

  startGame = () => {
    this.setState({ gameStatus: "started" });
  };

  quitGame = () => {
    this.setState({
      players: [
        {
          name: "",
          position: 0,
          goaled: false,
          rank: null,
        },
      ],
      boardLength: "",
      gameStatus: "entering",
      curPlayerIdx: 0,
      goaledPlayers: 0,
    });
  };

  rollDice = () => {
    const diceIdx = Math.floor(Math.random() * 6) + 1;
    const playersCopy = this.state.players.slice();

    if (
      playersCopy[this.state.curPlayerIdx].position + diceIdx >
      Number(this.state.boardLength) - 1
    ) {
      this.goal();
      if (this.state.goaledPlayers === this.state.players.length) {
        this.finishGame();
        return;
      }
    } else {
      playersCopy[this.state.curPlayerIdx].position += diceIdx;
      this.setState(() => ({
        players: playersCopy,
      }));
    }

    const getNextPlayerIdx = (curIdx) => {
      let i = curIdx;
      do {
        if (i === this.state.players.length - 1) {
          i = 0;
          continue;
        }
        i++;
      } while (
        this.state.players[i].goaled &&
        this.state.players.length !== this.state.goaledPlayers
      );
      return i;
    };

    this.setState((state) => ({
      diceIdx: diceIdx,
      curPlayerIdx: getNextPlayerIdx(state.curPlayerIdx),
    }));
  };

  goal = () => {
    const playersCopy = this.state.players.slice();
    playersCopy[this.state.curPlayerIdx] = {
      name: playersCopy[this.state.curPlayerIdx].name,
      position: Number(this.state.boardLength) - 1,
      goaled: true,
      rank: this.state.goaledPlayers + 1,
    };

    this.setState((state) => ({
      players: playersCopy,
      goaledPlayers: state.goaledPlayers + 1,
    }));
  };

  finishGame = () => {
    this.setState(() => ({
      gameStatus: "finished",
    }));
  };

  render() {
    if (this.state.gameStatus === "entering") {
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

    if (
      this.state.gameStatus === "started" ||
      this.state.gameStatus === "finished"
    ) {
      return (
        <div>
          <div>
            <button onClick={this.quitGame}>ゲームをやめる</button>
          </div>
          {this.renderDice()}
          {this.renderGoalText()}
          <div>サイコロの目: {this.state.diceIdx}</div>
          <div className="boards">{this.renderBoards()}</div>
        </div>
      );
    }
  }
}

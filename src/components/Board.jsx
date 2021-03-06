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

export default function Board(props) {
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
}

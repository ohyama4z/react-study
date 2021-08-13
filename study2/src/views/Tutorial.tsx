import React from "react";
import "../assets/Tutorial.css";
import Board from "../components/Board";

export type SquareValue = `X` | `O` | null

const calculateWinner = (squares: SquareValue[]): (SquareValue | null) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Tutorial: React.FC<{}> = (props) => {
    type History = { squares: SquareValue[] }[]
    const [history, setHistory] = React.useState<History>([{squares: Array(9).fill(null)}])
    const [stepNumber, setStepNumber] = React.useState<number>(0)
    const [xIsNext, setXIsNext] = React.useState<boolean>(true)

    const handleClick = (i: number) => {
        const clickedHistory = history.slice(0, stepNumber + 1)
        const current = clickedHistory[clickedHistory.length - 1]
        const squares = current.squares.slice()

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";

        setHistory([...clickedHistory, {squares}])
        setStepNumber(clickedHistory.length)
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step: number): void => {
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step: History[number], move: number) => {
        const desc = move ? `${move}手目に戻る` : "はじめから";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const status = winner
        ? `勝者: ${winner}`
        : `現在の手番: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}


export default Tutorial
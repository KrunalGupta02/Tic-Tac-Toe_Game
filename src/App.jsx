import { useState } from "react";

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));

  //? for the "O" move
  const [xIsNext, setXIsNext] = useState(true);

  //? for draw
  const [filledSquare, setFilledSquare] = useState(0);

  function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

  // The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to add X to the first ([0] index) square.
  const handleClick = (i) => {
    const nextSquares = square.slice();

    //*  If the square is already filled, you will return in the handleClick function early—before it tries to update the board state.
    if (square[i] || calculateWinner(square)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquare(nextSquares);
    setXIsNext(!xIsNext);

    setFilledSquare(filledSquare + 1);
  };

  function isDraw() {
    return filledSquare == 9 && !calculateWinner(square);
  }

  const winner = calculateWinner(square);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw()) {
    status = "It's a draw!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board_row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board_row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board_row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

const calculateWinner = (square) => {
  // all the possible winning combinations
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

    if (square[a] && square[a] == square[b] && square[a] == square[c]) {
      return square[a];
    }
  }
  return null;
};

export default App;

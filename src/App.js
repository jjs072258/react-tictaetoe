import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
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
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber]; //최신 squares 가져오기
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next player ${xIsNext ? 'X' : 'O'} `;
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move # ' + move : 'Go to game start';
    return (
      <li key={move}>
        <button
          className='move-button'
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  /**
   * 셀의 index값을 가져옴
   *
   * @param {*} i
   * @returns
   */
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1]; //히스토리에서 가장 최신 squares
    const newSquares = newCurrent.squares.slice(); //최신 squares의 복사본
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O'; // xIsNext값에 따라서 표시
    setHistory([...newHistory, { squares: newSquares }]);
    setxIsNext((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);
    setHistory(history.slice(0, step + 1));
  };

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          onClick={(i) => {
            handleClick(i);
          }}
          squares={current.squares}
        />
      </div>
      <div className='game-info'>
        <div className='status'>Next Player : {status}</div>
        <ol style={{ listStyle: 'none' }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;

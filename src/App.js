import React, { useState } from 'react';
import './App.css';
import xImage from './akakkaka.jpg'; 
import oImage from './akkak.jpg'; 

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner || !gameStarted) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(board) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setShowPopup(false);
    setResultMessage('');
    setGameStarted(true);
  }

  function startGame() {
    setGameStarted(true);
  }

  React.useEffect(() => {
    if (winner) {
      setResultMessage(`${winner} Menang!`);
      setShowPopup(true);
    } else if (!board.includes(null)) {
      setResultMessage('Seri!');
      setShowPopup(true);
    }
  }, [board, winner]);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      
      {!gameStarted && (
        <button onClick={startGame}>Mulai!!!</button>
      )}
      
      {gameStarted && (
        <>
          <div className="turn-info">
            <h2>
              Giliran Bermain: 
              <img
                src={xIsNext ? xImage : oImage}
                alt={xIsNext ? 'X Turn' : 'O Turn'}
                className="turn-image"
              />
            </h2>
          </div>
          <div className="game-board">
            {board.map((cell, index) => (
              <div
                key={index}
                className="cell"
                onClick={() => handleClick(index)}
              >
                {cell === 'X' ? <img src={xImage} alt="X" className="symbol-image" /> : null}
                {cell === 'O' ? <img src={oImage} alt="O" className="symbol-image" /> : null}
              </div>
            ))}
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>
                  {resultMessage}
                  {winner && (
                    <img
                      src={winner === 'X' ? xImage : oImage}
                      alt={winner}
                      className="result-image"
                    />
                  )}
                </h2>
                <button onClick={resetGame}>Mulai Ulang</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
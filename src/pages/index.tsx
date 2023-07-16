import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const onClick = (x: number, y: number) => {
    //console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
      [1, -1],
      [1, 1],
      [-1, -1],
      [-1, 1],
    ];

    const canPlaceStone = false;
    //const nextMoves = [];

    for (let i = 0; i < 8; i++) {
      const dx = directions[i][0];
      const dy = directions[i][1];
      //console.log(dx, dy);

      if (
        board[y + dy] !== undefined &&
        board[x + dx] !== undefined &&
        board[y + dy][x + dx] === 3 - turnColor
      ) {
        for (let i = 2; i < 8; i++) {
          if (
            board[y + i * dy] !== undefined &&
            board[x + i * dx] !== undefined &&
            board[y + i * dy][x + i * dx] === turnColor
          ) {
            for (let j = 0; j < i; j++) {
              newBoard[y + j * dy][x + j * dx] = turnColor;
            }

            setTurnColor(3 - turnColor);
            // newBoard[y - i + 1][x - i + 1] = 3;
            break;
          }
        }
      }
    }

    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const color = newBoard[py][px];
        //console.log(px, py, color);s
        if (color === 0) {
          if (newBoard[py + 1] !== undefined && newBoard[py + 1][px] === turnColor) {
            for (let i = 2; i < 7; i++) {
              if (newBoard[py + 3][px] === 3 - turnColor) {
                newBoard[py][px] = 3;
              }
            }
          }
        }
      }
    }

    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : color === 3 ? '#ffff00' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

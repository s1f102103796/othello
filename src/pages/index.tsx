import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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

    for (let i = 0; i < 8; i++) {
      const dx = directions[i][0];
      const dy = directions[i][1];
      console.log(dx, dy);

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
            break;
          }
        }
      }

      // if (
      //   board[y + 1] !== undefined &&
      //   board[x + 0] !== undefined &&
      //   board[y + 1][x] === 3 - turnColor
      // ) {
      //   for (let i = 2; i < 8; i++) {
      //     if (board[y + i] !== undefined && board[y + i][x] === turnColor) {
      //       for (let j = 0; j < i; j++) {
      //         newBoard[y + j][x] = turnColor;
      //       }
      //       setTurnColor(3 - turnColor);
      //       break;
      //     }
      //   }
      // }
      // if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor) {
      //   for (let i = 2; i < 8; i++) {
      //     if (board[y - i] !== undefined && board[y - i][x] === turnColor) {
      //       for (let j = 0; j < i; j++) {
      //         newBoard[y - j][x] = turnColor;
      //       }
      //       setTurnColor(3 - turnColor);
      //       break;
      //     }
      //   }
      // }
      // if (board[x + 1] !== undefined && board[y][x + 1] === 3 - turnColor) {
      //   for (let i = 2; i < 8; i++) {
      //     if (board[x + i] !== undefined && board[y][x + i] === turnColor) {
      //       for (let j = 0; j < i; j++) {
      //         newBoard[y][x + j] = turnColor;
      //       }
      //       setTurnColor(3 - turnColor);
      //       break;
      //     }
      //   }
      // }
      // if (board[x - 1] !== undefined && board[y][x - 1] === 3 - turnColor) {
      //   for (let i = 2; i < 8; i++) {
      //     if (board[x - i] !== undefined && board[y][x - i] === turnColor) {
      //       for (let j = 0; j < i; j++) {
      //         newBoard[y][x - j] = turnColor;
      //       }
      //       setTurnColor(3 - turnColor);
      //       break;
      //     }
      //   }
      //}
      // if (board[y + 1] !== undefined && board[y + 1][x + 1] === 3 - turnColor) {
      //   for (let i = 2; i < 8; i++) {
      //     if (board[y + i] !== undefined && board[y + i][x + i] === turnColor) {
      //       for (let j = 0; j < i; j++) {
      //         newBoard[y + j][x + j] = turnColor;
      //       }
      //       setTurnColor(3 - turnColor);
      //       break;
      //     }
      //   }
      // } else if (board[y + 1] !== undefined && board[y + 1][x - 1] === 3 - turnColor) {
      //   newBoard[y][x] = turnColor;
      //   setTurnColor(3 - turnColor);
      // } else if (board[y - 1] !== undefined && board[y - 1][x + 1] === 3 - turnColor) {
      //   newBoard[y][x] = turnColor;
      //   setTurnColor(3 - turnColor);
      // } else if (board[y - 1] !== undefined && board[y - 1][x - 1] === 3 - turnColor) {
      //   newBoard[y][x] = turnColor;
      //   setTurnColor(3 - turnColor);
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
                  style={{ background: color === 1 ? '#000' : '#fff' }}
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

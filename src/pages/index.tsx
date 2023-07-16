import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //黒と白の点を計算、useStateの外でやる
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

    for (let s = 0; s < 8; s++) {
      const dx = directions[s][0];
      const dy = directions[s][1];
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
        let cnt = 0;
        let pass = 0;
        if (color === 3) {
          newBoard[py][px] = 0;
        }
        //console.log(px, py, color);
        for (let s = 0; s < 8; s++) {
          const dx = directions[s][0];
          const dy = directions[s][1];

          if (color === 0) {
            if (
              newBoard[py + dy] !== undefined &&
              newBoard[px + dx] !== undefined &&
              newBoard[py + dy][px + dx] === turnColor
            ) {
              for (let k = 1; k < 7; k++) {
                if (
                  newBoard[py + k * dy] !== undefined &&
                  newBoard[px + k * dx] !== undefined &&
                  newBoard[py + k * dy][px + k * dx] === 3 - turnColor
                ) {
                  newBoard[py][px] = 3;
                  cnt++;
                }
              }
            }
          }
        }
        if (cnt === 0) {
          setTurnColor(3 - turnColor);
          pass++;
        }
      }
    }

    //     if (color === 0) {
    //       if (newBoard[py + 1] !== undefined && newBoard[py + 1][px] === turnColor) {
    //         for (let k = 2; k < 7; k++) {
    //           if (newBoard[py + k] !== undefined && newBoard[py + k][px] === 3 - turnColor) {
    //             newBoard[py][px] = 3;
    //           }
    //         }
    //       }
    //       if (newBoard[py - 1] !== undefined && newBoard[py - 1][px] === turnColor) {
    //         for (let k = 2; k < 7; k++) {
    //           if (newBoard[py - k] !== undefined && newBoard[py - k][px] === 3 - turnColor) {
    //             newBoard[py][px] = 3;
    //           }
    //         }
    //       }
    //       if (newBoard[px - 1] !== undefined && newBoard[py][px - 1] === turnColor) {
    //         for (let k = 2; k < 7; k++) {
    //           if (newBoard[px - k] !== undefined && newBoard[py][px - k] === 3 - turnColor) {
    //             newBoard[py][px] = 3;
    //           }
    //         }
    //       }
    //       if (newBoard[px + 1] !== undefined && newBoard[py][px + 1] === turnColor) {
    //         for (let k = 2; k < 7; k++) {
    //           if (newBoard[px + k] !== undefined && newBoard[py][px + k] === 3 - turnColor) {
    //             newBoard[py][px] = 3;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

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

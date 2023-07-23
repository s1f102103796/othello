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
  const [errorMessage, setErrorMessage] = useState('');

  //黒と白の点を計算、useStateの外でやる
  const [count1, setCount1] = useState(2);
  const [count2, setCount2] = useState(2);
  const countStones = (board: number[][]) => {
    let count1 = 0;
    let count2 = 0;
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        if (board[py][px] === 1) {
          count1++;
        } else if (board[py][px] === 2) {
          count2++;
        }
      }
    }
    return [count1, count2];
  };

  const onClick = (x: number, y: number) => {
    //console.log(x, y);
    // if (board[y][x] === 0) {
    //   setErrorMessage('⚠️ERROR!');
    //   return;
    // }
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

    for (let s = 0; s < 8; s++) {
      const dx = directions[s][0];
      const dy = directions[s][1];
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
        console.log(x, y);
      }
    }

    const boardWithCondidate: number[][] = JSON.parse(JSON.stringify(newBoard));
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const color = boardWithCondidate[py][px];
        if (color === 3) {
          boardWithCondidate[py][px] = 0;
        }
        for (let s = 0; s < 8; s++) {
          const dx = directions[s][0];
          const dy = directions[s][1];

          if (boardWithCondidate[py][px] === 0) {
            if (
              newBoard[py + dy] !== undefined &&
              newBoard[px + dx] !== undefined &&
              newBoard[py + dy][px + dx] === turnColor
            ) {
              for (let k = 1; k < 8; k++) {
                if (
                  newBoard[py + k * dy] !== undefined &&
                  newBoard[px + k * dx] !== undefined &&
                  newBoard[py + k * dy][px + k * dx] === 3 - turnColor
                ) {
                  boardWithCondidate[py][px] = 3;
                }
              }
            }
          }
        }
        // for (let k = 1; k < 8; k++) {
        //   if (boardWithCondidate[py][px] === 0) {
        //     if (newBoard[py + 1] !== undefined && newBoard[py + 1][px] === turnColor) {
        //       if (newBoard[py + k] !== undefined && newBoard[py + k][px] === 3 - turnColor) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (newBoard[py - 1] !== undefined && newBoard[py - 1][px] === turnColor) {
        //       if (newBoard[py - k] !== undefined && newBoard[py - k][px] === 3 - turnColor) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (newBoard[px + 1] !== undefined && newBoard[py][px + 1] === turnColor) {
        //       if (newBoard[px + k] !== undefined && newBoard[py][px + k] === 3 - turnColor) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (newBoard[px - 1] !== undefined && newBoard[py][px - 1] === turnColor) {
        //       if (newBoard[px - k] !== undefined && newBoard[py][px - k] === 3 - turnColor) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (
        //       newBoard[py + 1] !== undefined &&
        //       newBoard[px + 1] !== undefined &&
        //       newBoard[py + 1][px + 1] === turnColor
        //     ) {
        //       if (
        //         newBoard[py + k] !== undefined &&
        //         newBoard[px + k] !== undefined &&
        //         newBoard[py + k][px + k] === 3 - turnColor
        //       ) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (
        //       newBoard[py - 1] !== undefined &&
        //       newBoard[px - 1] !== undefined &&
        //       newBoard[py - 1][px - 1] === turnColor
        //     ) {
        //       if (
        //         newBoard[py - k] !== undefined &&
        //         newBoard[px - k] !== undefined &&
        //         newBoard[py - k][px - k] === 3 - turnColor
        //       ) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (
        //       newBoard[py - 1] !== undefined &&
        //       newBoard[px + 1] !== undefined &&
        //       newBoard[py - 1][px + 1] === turnColor
        //     ) {
        //       if (
        //         newBoard[py - k] !== undefined &&
        //         newBoard[px + k] !== undefined &&
        //         newBoard[py - k][px + k] === 3 - turnColor
        //       ) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //     if (
        //       newBoard[py + 1] !== undefined &&
        //       newBoard[px - 1] !== undefined &&
        //       newBoard[py + 1][px - 1] === turnColor
        //     ) {
        //       if (
        //         newBoard[py + k] !== undefined &&
        //         newBoard[px - k] !== undefined &&
        //         newBoard[py + k][px - k] === 3 - turnColor
        //       ) {
        //         boardWithCondidate[py][px] = 3;
        //       }
        //     }
        //   }
        // }
      }
    }
    // for (let py = 0; py < 8; py++) {
    //   for (let px = 0; px < 8; px++) {
    //     const color = boardWithCondidate[py][px];

    //     if (color === 3) {
    //       boardWithCondidate[py][px] = 0;
    //     }
    //     //console.log(111, px, py, color);
    //     for (let s = 0; s < 8; s++) {
    //       const dx = directions[s][0];
    //       const dy = directions[s][1];
    //       if (color === 0) {
    //         if (
    //           boardWithCondidate[py + dy] !== undefined &&
    //           boardWithCondidate[px + dx] !== undefined &&
    //           boardWithCondidate[py + dy][px + dx] === turnColor
    //         ) {
    //           for (let k = 1; k < 8; k++) {
    //             if (
    //               boardWithCondidate[py + k * dy] !== undefined &&
    //               boardWithCondidate[px + k * dx] !== undefined &&
    //               boardWithCondidate[py + k * dy][px + k * dx] === 3 - turnColor
    //             ) {
    //               if (boardWithCondidate[py + k * dy][px + k * dx] !== 3) {
    //                 if (
    //                   boardWithCondidate[py + k * dy][px + k * dx] === 3 &&
    //                   boardWithCondidate[py + k * dy][px + k * dx] === 0
    //                 ) {
    //                   boardWithCondidate[py][px] = 0;
    //                 } else {
    //                   boardWithCondidate[py][px] = 3;
    //                 }
    //               }
    //             }
    //           }
    //           //console.log(222, px, py, color);
    //         }
    //       }
    //       // if (cnt === 0) {
    //       setTurnColor(3 - turnColor);

    //       //}
    //     }
    //     //console.log(222, px, py, color);
    //   }
    // }

    setBoard(boardWithCondidate);
    setErrorMessage('');

    const [newCount1, newCount2] = countStones(newBoard);
    setCount1(newCount1);
    setCount2(newCount2);
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
                  style={{
                    background:
                      color === 1 ? '#000' : color === 2 ? '#fff' : color === 3 ? '#ffff00' : '',
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
      {errorMessage && <p>{errorMessage}</p>}

      <div className={styles.score}>
        <h3>{turnColor === 1 ? '黒の番' : '白の番'}</h3>
        <h3>黒: {count1} stones</h3>
        <h3>白: {count2} stones</h3>
      </div>
    </div>
  );
};

export default Home;

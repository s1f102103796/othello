import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const pass = 0;
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
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 1, 1, 0, 0, 0],
    // [0, 0, 3, 2, 1, 0, 0, 0],
    // [0, 0, 3, 3, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  for (let qy = 0; qy < 8; qy++) {
    for (let qx = 0; qx < 8; qx++) {
      const color = newBoard[qy][qx];
      if (color === 3) {
        newBoard[qy][qx] = 0;
      }
    }
  }
  const readBoard: number[][] = JSON.parse(JSON.stringify(newBoard));
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
  const [errorMessage, setErrorMessage] = useState('');
  const [passCount, setPassCount] = useState(0);
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

  let isPlace = false;
  let cnt = 0;
  const boardWithCondidate: number[][] = JSON.parse(JSON.stringify(newBoard));
  if (isPlace) {
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        for (let s = 0; s < 8; s++) {
          const dx = directions[s][0];
          const dy = directions[s][1];
          // 石の数を更新
          const [newCount1, newCount2] = countStones(boardWithCondidate);
          setCount1(newCount1);
          setCount2(newCount2);

          if (boardWithCondidate[py][px] === 0) {
            if (newBoard[py + dy] !== undefined && newBoard[py + dy][px + dx] === turnColor) {
              for (let k = 1; k < 8; k++) {
                if (newBoard[py + k * dy] !== undefined) {
                  if (newBoard[py + k * dy][px + k * dx] === 3 - turnColor) {
                    boardWithCondidate[py][px] = 3;
                    cnt++;
                  }
                  if (newBoard[py + k * dy][px + k * dx] === turnColor) {
                    continue;
                  }
                }
                break;
              }
            }
          }
        }
      }
    }
  }
  // const resetGame = () => {
  //   const resetBoard: number[][] = [
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 3, 0, 0, 0],
  //     [0, 0, 0, 1, 2, 3, 0, 0],
  //     [0, 0, 3, 2, 1, 0, 0, 0],
  //     [0, 0, 0, 3, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //   ];

  //   setBoard(resetBoard);
  //   setTurnColor(1);
  //   setPassCount(0);
  // };

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    // if (board[y][x] === 0) {
    //   setErrorMessage('⚠️ERROR!');
    //   return;
    // }
    const pass = 0;

    for (let s = 0; s < 8; s++) {
      const dx = directions[s][0];
      const dy = directions[s][1];
      console.log(dx, dy);

      // for (let qy = 0; qy < 8; qy++) {
      //   for (let qx = 0; qx < 8; qx++) {
      //     const color = readBoard[qy][qx];
      //     if (color === 3 && passCount !== 2) {
      //       readBoard[qy][qx] = 0;
      //     }
      //   }
      // }

      if (readBoard[y][x] === 0) {
        if (readBoard[y + dy] !== undefined && readBoard[y + dy][x + dx] === 3 - turnColor) {
          for (let i = 2; i < 8; i++) {
            if (readBoard[y + i * dy] !== undefined) {
              if (readBoard[y + i * dy][x + i * dx] === turnColor) {
                for (let j = 0; j < i; j++) {
                  newBoard[y + j * dy][x + j * dx] = turnColor;
                }
                isPlace = true;
              }
              if (readBoard[y + i * dy][x + i * dx] === 3 - turnColor) {
                continue;
              }
            }

            break;
          }
          console.log(x, y);
        }
      }
    }
    // if (cnt === 0) {
    //   console.log('pass');
    //   setErrorMessage('PASS!');
    //   setPassCount((prevPass) => prevPass + 1);

    //   return;
    // }
    setBoard(boardWithCondidate);
    setTurnColor(3 - turnColor);

    // if (passCount === 2) {
    //   setErrorMessage('END');
    //   return;
    // }

    setErrorMessage('');

    const [newCount1, newCount2] = countStones(newBoard);
    setCount1(newCount1);
    setCount2(newCount2);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardContainer}>
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
          {/* スコアの内容 */}
          <h3>{turnColor === 1 ? '黒の番' : '白の番'}</h3>
          <h3>黒: {count1} stones</h3>
          <h3>白: {count2} stones</h3>
        </div>
        {/* <button className={styles['resetbutton']} onClick={resetGame}>
          Reset Game
        </button> */}
      </div>
    </div>
  );
};

export default Home;

import { closeSync } from 'node:fs';
import React, { useEffect, useRef, useState } from 'react';
import WarmCell from '../components/WarmCell';
import '../style.scss';

interface GameBoardProps {
  gameBoardSize: number;
}
interface Cell {
  id: number;
  top: number;
  left: number;
}
enum Direction {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
}
const GameBoard: React.FC<GameBoardProps> = ({ gameBoardSize }) => {
  let cellsId = 0;
  const CELLSIZE = 10;
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [direction, _setDirection] = useState<Direction>(Direction.RIGHT);
  const [cells, _setCells] = useState<Cell[]>([initWarmPostion()]);
  const [feedCell, _setFeedCell] = useState<Cell | null>();
  const cellsRef = useRef(cells);
  const intervalEventRef = useRef<any>();
  const warmSizeRef = useRef<number>(1);
  const directionRef = useRef<Direction>(direction);
  const feedCellRef = useRef(feedCell);

  function setCells(data: Cell[]) {
    cellsRef.current = [...data];
    _setCells(data);
  }
  function setFeedCell(data: Cell) {
    feedCellRef.current = data;
    _setFeedCell(data);
  }

  function randomFeedCell(): Cell {
    let top = Math.floor(Math.random() * Math.floor(gameBoardSize)) * CELLSIZE;
    let left = Math.floor(Math.random() * Math.floor(gameBoardSize)) * CELLSIZE;
    const cellMap = new Map();
    cellsRef?.current.map((v) => {
      cellMap.set(`${v.top},${v.left}`, true);
    });
    while (true) {
      if (!cellMap.has(`${top},${left}`)) {
        break;
      }
      top = Math.floor(Math.random() * Math.floor(gameBoardSize)) * CELLSIZE;
      left = Math.floor(Math.random() * Math.floor(gameBoardSize)) * CELLSIZE;
    }
    return { id: -1, top, left };
  }

  function setDirection(e: any) {
    if (e.keyCode === Direction.UP && directionRef.current !== Direction.DOWN) {
      // up
      directionRef.current = Direction.UP;
      _setDirection(Direction.UP);
    } else if (
      e.keyCode === Direction.DOWN &&
      directionRef.current !== Direction.UP
    ) {
      //down
      directionRef.current = Direction.DOWN;
      _setDirection(Direction.DOWN);
    } else if (
      e.keyCode === Direction.LEFT &&
      directionRef.current !== Direction.RIGHT
    ) {
      //left
      directionRef.current = Direction.LEFT;
      _setDirection(Direction.LEFT);
    } else if (
      e.keyCode === Direction.RIGHT &&
      directionRef.current !== Direction.LEFT
    ) {
      //right
      directionRef.current = Direction.RIGHT;
      _setDirection(Direction.RIGHT);
    }
  }
  function move() {
    let top = 0;
    let left = 0;
    const copy = [...cellsRef.current];
    if (directionRef.current === Direction.UP) {
      // up
      top -= 1;
    } else if (directionRef.current === Direction.DOWN) {
      //down
      top += 1;
    } else if (directionRef.current === Direction.LEFT) {
      //left
      left -= 1;
    } else if (directionRef.current === Direction.RIGHT) {
      //right
      left += 1;
    }
    const topPosition = copy[copy.length - 1].top + top * CELLSIZE;
    const leftPosition = copy[copy.length - 1].left + left * CELLSIZE;
    if (isEnd(topPosition, leftPosition)) {
      setGameStatus(false);
      return;
    }
    if (isEatFeed(topPosition, leftPosition)) {
      setFeedCell(randomFeedCell());
      warmSizeRef.current++;
    }
    copy?.push({
      id: ++cellsId,
      top: copy[copy.length - 1].top + top * CELLSIZE,
      left: copy[copy.length - 1].left + left * CELLSIZE,
    });
    setCells(copy.slice(-1 * warmSizeRef.current));
  }

  function isEatFeed(top: number, left: number): Boolean {
    if (
      feedCellRef?.current?.top === top &&
      feedCellRef?.current?.left === left
    ) {
      return true;
    }
    return false;
  }

  function initWarmPostion(): Cell {
    return {
      id: 0,
      top: Number(gameBoardSize / 2) * CELLSIZE,
      left: Number(gameBoardSize / 2) * CELLSIZE,
    };
  }

  function isEnd(top: number, left: number): Boolean {
    if (isOutOfLine(top, left)) {
      // 밖으로 나간 경우
      return true;
    }
    if (isCrashed(top, left)) {
      return true;
    }
    return false;
  }
  function isCrashed(top: number, left: number): Boolean {
    for (let i = 0; i < cellsRef.current.length; i++) {
      if (
        cellsRef.current[i].top === top &&
        cellsRef.current[i].left === left
      ) {
        return true;
      }
    }
    return false;
  }

  function isOutOfLine(top: number, left: number): Boolean {
    if (
      top < 0 ||
      top >= gameBoardSize * CELLSIZE ||
      left < 0 ||
      left >= gameBoardSize * CELLSIZE
    ) {
      return true;
    }
    return false;
  }

  function gameStartStop(gameStatus: boolean) {
    if (gameStatus) {
      //start
      setCells([initWarmPostion()]);
      setFeedCell(randomFeedCell());
      warmSizeRef.current = 1;
      intervalEventRef.current = setInterval(move, 50);
    } else {
      clearInterval(intervalEventRef.current);
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', setDirection);
  }, []);

  useEffect(() => {
    gameStartStop(gameStatus);
  }, [gameStatus]);

  return (
    <>
      <div data-testid="board" className={`board-${gameBoardSize}`}>
        {cells?.map((warm) => (
          <WarmCell key={warm.id} {...warm} />
        ))}
        {feedCell && <WarmCell {...feedCell} type="feed" />}
        {!gameStatus && (
          <div data-testid="game-over-modal" className={'modal'}>
            <p>gameOver</p>
          </div>
        )}
      </div>
      <button onClick={() => setGameStatus(!gameStatus)}>
        {gameStatus ? 'stop' : 'start'}
      </button>
    </>
  );
};

export default GameBoard;

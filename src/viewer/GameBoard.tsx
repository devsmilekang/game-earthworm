import React, { useEffect } from 'react';
import WarmCell from '../components/WarmCell';
import { selectGameSize } from '../slice/WarmGameSlice';
import {
  selectStatus,
  selectDirection,
  selectFeedCell,
  selectcells,
  selectScore,
  setStatus,
  selectOneCellSize,
  initWarmPosition,
  setDirection,
} from '../slice/GameBoardSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import '../style.scss';
import RunnginGame from './RunningGame';

const GameBoard: React.FC = () => {
  const gameBoardSize = useAppSelector(selectGameSize);
  const status = useAppSelector(selectStatus);
  const direction = useAppSelector(selectDirection);
  const cells = useAppSelector(selectcells);
  const feedCell = useAppSelector(selectFeedCell);
  const score = useAppSelector(selectScore);
  const oneCellSize = useAppSelector(selectOneCellSize);
  const dispatch = useAppDispatch();
  function initGame(status: boolean) {
    if (status) {
      dispatch(initWarmPosition({ gameBoardSize, oneCellSize, cells }));
    } else {
    }
  }
  function keyDownEvent(this: HTMLElement, ev: KeyboardEvent) {
    dispatch(setDirection(ev.keyCode));
  }

  useEffect(() => {
    document.body.addEventListener('keydown', keyDownEvent);
  }, []);

  useEffect(() => {
    initGame(status);
  }, [status]);

  return (
    <>
      <div data-testid="board" className={`board-${gameBoardSize}`}>
        {cells?.map((warm) => (
          <WarmCell
            data-testid="warm-cell"
            key={warm.id}
            {...warm}
            type="warm"
          />
        ))}
        {feedCell && (
          <WarmCell data-testid="feed-cell" {...feedCell} type="feed" />
        )}
        {!status && (
          <div data-testid="game-over-modal" className={'modal'}>
            <p>gameOver</p>
          </div>
        )}
      </div>
      <button
        data-testid="game-progress-button"
        onClick={() => dispatch(setStatus(!status))}
      >
        {status ? 'stop' : 'start'}
      </button>
      <RunnginGame
        status={status}
        gameBoardSize={gameBoardSize}
        cells={cells}
        feedCell={feedCell}
        oneCellSize={oneCellSize}
        direction={direction}
        score={score}
      />
    </>
  );
};

export default GameBoard;

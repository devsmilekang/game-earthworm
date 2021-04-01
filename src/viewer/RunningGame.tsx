import React, { useEffect, useRef } from 'react';
import { moveCells } from '../slice/GameBoardSlice';
import { useAppDispatch } from '../store/hooks';
import { GameBaord } from '../type/type';

function RunnginGame({
  status,
  direction,
  cells,
  feedCell,
  score,
  oneCellSize,
  gameBoardSize,
}: GameBaord) {
  const intervalEvent = useRef<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      intervalEvent.current = setTimeout(
        dispatch,
        50,
        moveCells({
          status,
          direction,
          cells,
          feedCell,
          score,
          oneCellSize,
          gameBoardSize,
        })
      );
      return () => {
        clearTimeout(intervalEvent.current);
      };
    }
  });
  return null;
}

export default RunnginGame;

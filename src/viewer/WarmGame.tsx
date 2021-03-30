import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectGameSize, setGameBoardSize } from '../slice/WarmGameSlice';
import CustomRadio from '../components/CustomRadio';

function WarmGame() {
  const gameBoardSize = useAppSelector(selectGameSize);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document
      .getElementById('game-board-size-control')
      ?.addEventListener('click', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.dataset?.radioName === 'game-board-size') {
          dispatch(setGameBoardSize(Number(target.value)));
        }
      });
  }, []);
  return (
    <div data-testid="warm-game">
      <GameBoard />
      <form>
        <fieldset id="game-board-size-control">
          <span>게임 크기 선택</span>
          {[20, 30, 40, 50].map((value) => {
            return (
              <CustomRadio
                key={value}
                value={value}
                name="game-board-size"
                defaultValue={gameBoardSize}
              />
            );
          })}
        </fieldset>
      </form>
    </div>
  );
}

export default WarmGame;

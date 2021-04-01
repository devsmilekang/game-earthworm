import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { RootState } from '../store/store';
import { GameBaord, Direction, Cell } from '../type/type';

const initialState: GameBaord = {
  status: false,
  direction: Direction.RIGHT,
  cells: null,
  feedCell: null,
  score: 1,
  oneCellSize: 10,
};

interface PostionPayload {
  gameBoardSize: number;
  cells?: Cell[] | null;
  oneCellSize: number;
}

export const gameBoardSlice = createSlice({
  name: 'GameBoard',
  initialState,
  reducers: {
    initWarmPosition: (state, action: PayloadAction<PostionPayload>) => {
      const { gameBoardSize, oneCellSize } = action.payload;
      state.cells = [
        {
          id: 0,
          top: Number((gameBoardSize / 2) * oneCellSize),
          left: Number((gameBoardSize / 2) * oneCellSize),
        },
      ];
      state.feedCell = makeRandomFeedCell(
        gameBoardSize,
        oneCellSize,
        state.cells
      );
      state.score = 1;
    },
    setFeedCell: (state, action: PayloadAction<PostionPayload>) => {
      const { gameBoardSize, cells, oneCellSize } = action.payload;
      if (cells) {
        state.feedCell = makeRandomFeedCell(gameBoardSize, oneCellSize, cells);
      }
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setDirection: (state, action: PayloadAction<number>) => {
      const key = action.payload;
      if (key === Direction.UP && state.direction !== Direction.DOWN) {
        state.direction = Direction.UP;
      } else if (key === Direction.DOWN && state.direction !== Direction.UP) {
        state.direction = Direction.DOWN;
      } else if (
        key === Direction.LEFT &&
        state.direction !== Direction.RIGHT
      ) {
        state.direction = Direction.LEFT;
      } else if (
        key === Direction.RIGHT &&
        state.direction !== Direction.LEFT
      ) {
        state.direction = Direction.RIGHT;
      }
    },
    moveCells: (state, action: PayloadAction<GameBaord>) => {
      let top = 0;
      let left = 0;
      const {
        cells,
        direction,
        oneCellSize,
        gameBoardSize,
        feedCell,
        score,
      } = action.payload;
      const copy = cells ? [...cells] : null;
      if (copy && gameBoardSize && feedCell) {
        if (direction === Direction.UP) {
          top -= 1;
        } else if (direction === Direction.DOWN) {
          top += 1;
        } else if (direction === Direction.LEFT) {
          left -= 1;
        } else if (direction === Direction.RIGHT) {
          left += 1;
        }
        const topPosition = copy[copy.length - 1].top + top * oneCellSize;
        const leftPosition = copy[copy.length - 1].left + left * oneCellSize;
        if (
          isEnd(copy, gameBoardSize, oneCellSize, topPosition, leftPosition)
        ) {
          state.status = false;
          return;
        }
        if (isEatFeed(feedCell, topPosition, leftPosition)) {
          state.feedCell = makeRandomFeedCell(gameBoardSize, oneCellSize, copy);
          state.score = score + 1;
        }
        copy.push({
          id: topPosition * 1000 + leftPosition,
          top: topPosition,
          left: leftPosition,
        });

        state.cells = copy.slice(-1 * state.score);
      }
    },
  },
});

function makeRandomFeedCell(
  gameBoardSize: number,
  oneCellSize: number,
  cells: Cell[]
): Cell {
  let top = Math.floor(Math.random() * Math.floor(gameBoardSize)) * oneCellSize;
  let left =
    Math.floor(Math.random() * Math.floor(gameBoardSize)) * oneCellSize;
  const cellMap = new Map();
  cells.map((v) => {
    cellMap.set(`${v.top},${v.left}`, true);
  });
  while (true) {
    if (!cellMap.has(`${top},${left}`)) {
      break;
    }
    top = Math.floor(Math.random() * Math.floor(gameBoardSize)) * oneCellSize;
    left = Math.floor(Math.random() * Math.floor(gameBoardSize)) * oneCellSize;
  }
  return { id: -1, top, left };
}

function isEatFeed(feedCell: Cell, top: number, left: number): Boolean {
  if (feedCell.top === top && feedCell.left === left) {
    return true;
  }
  return false;
}

function isEnd(
  cells: Cell[],
  gameBoardSize: number,
  oneCellSize: number,
  top: number,
  left: number
): Boolean {
  if (isOutOfLine(gameBoardSize, oneCellSize, top, left)) {
    // 밖으로 나간 경우
    return true;
  }
  if (isCrashed(cells, top, left)) {
    return true;
  }
  return false;
}

function isOutOfLine(
  gameBoardSize: number,
  oneCellSize: number,
  top: number,
  left: number
): Boolean {
  if (
    top < 0 ||
    top >= gameBoardSize * oneCellSize ||
    left < 0 ||
    left >= gameBoardSize * oneCellSize
  ) {
    return true;
  }
  return false;
}
function isCrashed(cells: Cell[], top: number, left: number): Boolean {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].top === top && cells[i].left === left) {
      return true;
    }
  }
  return false;
}

export const {
  initWarmPosition,
  setFeedCell,
  setStatus,
  moveCells,
  setScore,
  setDirection,
} = gameBoardSlice.actions;

// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
export const selectStatus = (state: RootState) => state.GameBoard.status;
export const selectDirection = (state: RootState) => state.GameBoard.direction;
export const selectcells = (state: RootState) => state.GameBoard.cells;
export const selectFeedCell = (state: RootState) => state.GameBoard.feedCell;
export const selectScore = (state: RootState) => state.GameBoard.score;
export const selectOneCellSize = (state: RootState) =>
  state.GameBoard.oneCellSize;

export default gameBoardSlice.reducer;

export enum Direction {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
}

export interface WarmGame {
  gameBoardSize: number;
}
export interface Cell {
  id: number;
  top: number;
  left: number;
}

export interface GameBaord {
  status: boolean;
  direction: Direction;
  cells: Cell[] | null;
  feedCell: Cell | null;
  score: number;
  oneCellSize: number;
  gameBoardSize?: number;
}

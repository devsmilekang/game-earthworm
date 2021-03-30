export enum Direction {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
}

export interface GameBoardProps {
  gameBoardSize: number;
}
export interface Cell {
  id: number;
  top: number;
  left: number;
}

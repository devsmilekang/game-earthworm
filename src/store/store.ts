import { configureStore } from '@reduxjs/toolkit';
import WarmGameReducer from '../slice/WarmGameSlice';
import GameBarodReducer from '../slice/GameBoardSlice';

export const store = configureStore({
  reducer: {
    WarmGame: WarmGameReducer,
    GameBoard: GameBarodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

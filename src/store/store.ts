import { configureStore } from '@reduxjs/toolkit';
import WarmGameReducer from '../slice/WarmGameSlice';

export const store = configureStore({
  reducer: {
    WarmGame: WarmGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

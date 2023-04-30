import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export type State = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export default store
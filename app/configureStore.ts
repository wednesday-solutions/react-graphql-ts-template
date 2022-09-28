/**
 * Create the store with dynamic reducers
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ItuneReducer from './containers/ItuensContainer/reducer';
import ituneCallSaga from './containers/ItuensContainer/saga';
import createSagaMiddleware from 'redux-saga';
// import { createInjectorsEnhancer } from 'redux-injectors';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    Itune: ItuneReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(ituneCallSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

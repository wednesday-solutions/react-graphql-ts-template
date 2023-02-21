/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { composeWithDevTools } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
import createReducer from './reducers';
import { createInjectorsEnhancer } from 'redux-injectors';

// redux persit configuration
const persistConfig = {
  version: 1,
  transforms: [immutableTransform()],
  key: 'root',
  blacklist: ['home', 'launchDetails'],
  storage
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export type RootState = ReturnType<typeof persistedReducer>;

export default function configureStore(initialState: object) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    composeEnhancers = composeWithDevTools as typeof compose;
    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const runSaga = sagaMiddleware.run;
  const injectEnhancer = createInjectorsEnhancer({
    createReducer,
    runSaga
  });

  const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers, injectEnhancer) as any);
  const persistor = persistStore(store);

  // Extensions
  // store.runSaga = sagaMiddleware.run;
  // store.injectedReducers = {}; // Reducer registry
  // store.injectedSagas = {}; // Saga Registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers));
  //   });
  // }
  return { store, persistor };
}

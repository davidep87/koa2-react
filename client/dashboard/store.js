import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './states/auth';

const defaultState = { auth };
const logger = createLogger();
const finalMiddleware = applyMiddleware( thunkMiddleware, logger );
const enhancers = compose(finalMiddleware, autoRehydrate({ log: false }));

const store = createStore(rootReducer, defaultState, enhancers);
export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot){
  module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
  });
}

export default store;

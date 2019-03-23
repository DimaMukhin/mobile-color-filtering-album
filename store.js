import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';

const middleware = [];

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}

import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

const asyncReducers = {};
const reducerCounters = {};

export function injectReducer(store, reducers) {
  if (isEmpty(reducers)) {
    return;
  }

  Object.keys(reducers).forEach(key => {
    reducerCounters[key] = (reducerCounters[key] || 0) + 1;
    asyncReducers[key] = reducers[key];
  });

  store.replaceReducer(combineReducers(asyncReducers));
}

export function initalAsyncReducers(initalReducers) {
  Object.assign(asyncReducers, initalReducers);
}

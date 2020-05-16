import { combineReducers } from 'redux';
import test from './test';

export default function createRootReducer() {
  return combineReducers({ test });
}

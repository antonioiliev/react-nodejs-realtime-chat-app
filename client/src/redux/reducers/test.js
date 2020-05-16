// @flow
import { TEST_ACTION } from './types';

export default (state = { value: '0' }, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return {
        value: action.value
      };
    default:
      return state;
  }
};

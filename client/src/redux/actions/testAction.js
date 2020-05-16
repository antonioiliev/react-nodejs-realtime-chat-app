import { TEST_ACTION } from '../reducers/types';

export const testRedux = text => ({
  type: TEST_ACTION,
  text
});

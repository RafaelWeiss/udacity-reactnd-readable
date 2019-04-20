import { createAction } from 'redux-actions';

export const createType = (stateKey, type) =>
  `readable/${stateKey}/${type}`;

export const createAsyncTypes = (stateKey, type) => ({
  REQUEST: `${createType(stateKey, type)}_REQUEST`,
  SUCCESS: `${createType(stateKey, type)}_SUCCESS`,
  ERROR: `${createType(stateKey, type)}_ERROR`
});

export const createAsyncActions = (asyncTypes) => ({
  request: createAction(asyncTypes.REQUEST),
  success: createAction(asyncTypes.SUCCESS),
  error: createAction(asyncTypes.ERROR)
});

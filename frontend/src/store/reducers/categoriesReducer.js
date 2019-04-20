import { createAsyncTypes, createAsyncActions } from '../reducersFactory';
import { handleActions } from 'redux-actions';

const stateKey = 'categories';

/* Actions Types */
export const types = {
    GET_ALL_CATEGORIES: createAsyncTypes(stateKey, 'GET_ALL_CATEGORIES'),
};

/* Actions */
export const actions = {
    getAllCategories: createAsyncActions(types.GET_ALL_CATEGORIES),
};

/* Reducer */
const initialState = [];

/* Reducers */
export default handleActions(
    {
        [types.GET_ALL_CATEGORIES.SUCCESS]: (state, action) => [...action.payload.categories]
    },
    initialState
);

/* Selectors */
const getCategories = (state) => state[stateKey];

export const selectors = {
    getCategories
};

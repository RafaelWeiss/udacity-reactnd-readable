import {createAction, handleActions} from 'redux-actions';


/* Actions Types */
const SHOW_LOADING = 'readable/loading/SHOW_LOADING';
const HIDE_LOADING = 'readable/loading/HIDE_LOADING';

export const types = {
    SHOW_LOADING,
    HIDE_LOADING
};

/* Actions */
const showLoading = createAction(SHOW_LOADING);
const hideLoading = createAction(HIDE_LOADING);

export const actions = {
    showLoading,
    hideLoading
};

/* Reducer */
const initialState = false;

/* Reducers */
export default handleActions({
    [SHOW_LOADING]: () => true,
    [HIDE_LOADING]: () => false
}, initialState);

/* Selectors */
const getLoadingState = state => state.loading;

export const selectors = {
    getLoadingState
};
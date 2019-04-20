import {createAction, handleActions} from 'redux-actions';


/* Actions Types */
const UPDATE_POSTS_FILTER = 'readable/postsFilter/UPDATE_POSTS_FILTER';

export const types = {
    UPDATE_POSTS_FILTER
};

/* Actions */
const updatePostsFilter = createAction(UPDATE_POSTS_FILTER);

export const actions = {
    updatePostsFilter
};

/* State */
const initialState = {
    category: '',
    orderBy: 'voteScore'
};

/* Reducers */
export default handleActions({
    [UPDATE_POSTS_FILTER]: (state, action) => ({
        ...state,
        ...action.payload
    })
}, initialState);

/* Selectors */
const getSelectedCategory = state => state.postsFilter.category;
const getSelectedOderby = state => state.postsFilter.orderBy;

export const selectors = {
    getSelectedCategory,
    getSelectedOderby
};
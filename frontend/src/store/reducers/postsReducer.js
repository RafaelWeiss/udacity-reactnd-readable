import { createAsyncTypes, createAsyncActions } from '../reducersFactory';
import { handleActions } from 'redux-actions';
import { sortBy } from '../../utils/ArrayUtils';
import { updateItemInArray } from '../reducersUtils';

const stateKey = 'posts';

/* Actions Types */
export const types = {
    GET_ALL_POSTS: createAsyncTypes(stateKey, 'GET_ALL_POSTS'),
    GET_CATEGORY_POSTS: createAsyncTypes(stateKey, 'GET_CATEGORY_POSTS'),
    GET_POST_BY_ID: createAsyncTypes(stateKey, 'GET_POST_BY_ID'),
    SAVE_POST: createAsyncTypes(stateKey, 'SAVE_POST'),
    DELETE_POST: createAsyncTypes(stateKey, 'DELETE_POST'),
    UPDATE_POST: createAsyncTypes(stateKey, 'UPDATE_POST'),
    VOTE_UP: createAsyncTypes(stateKey, 'VOTE_UP'),
    VOTE_DOWN: createAsyncTypes(stateKey, 'VOTE_DOWN')
};

/* Actions */
export const actions = {
    getAllPosts: createAsyncActions(types.GET_ALL_POSTS),
    getPostById: createAsyncActions(types.GET_POST_BY_ID),
    getCategoryPosts: createAsyncActions(types.GET_CATEGORY_POSTS),
    savePost: createAsyncActions(types.SAVE_POST),
    updatePost: createAsyncActions(types.UPDATE_POST),
    deletePost: createAsyncActions(types.DELETE_POST),
    voteUp: createAsyncActions(types.VOTE_UP),
    voteDown: createAsyncActions(types.VOTE_DOWN)
};

/* Reducer */
const initialState = [];

/* Reducers */
export default handleActions(
    {
        [types.SAVE_POST.SUCCESS]: (state, action) => [...state, action.payload],
        [types.GET_ALL_POSTS.SUCCESS]: (state, action) => [...action.payload],
        [types.GET_CATEGORY_POSTS.SUCCESS]: (state, action) => [...action.payload],
        [types.GET_POST_BY_ID.SUCCESS]: (state, action) => [...state, action.payload],

        [types.DELETE_POST.SUCCESS]: (state, action) => {
            return state.filter((post) => post.id !== action.payload.id);
        },
        [types.VOTE_UP.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        },
        [types.VOTE_DOWN.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        },
        [types.UPDATE_POST.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        }
    },
    initialState
);

/* Selectors */
const getPosts = (state, orderBy, category) => {
    let filtredPosts = [...state.posts];
    if (category) {
        filtredPosts = filtredPosts.filter((post) => post.category === category);
    }

    if (orderBy) {
        filtredPosts = sortBy(filtredPosts, orderBy);
    }

    return filtredPosts;
};
const getPost = (state, postId) => state.posts.find((post) => post.id === postId);

export const selectors = {
    getPosts,
    getPost
};

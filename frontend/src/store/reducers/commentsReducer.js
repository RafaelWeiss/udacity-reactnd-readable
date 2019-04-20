import { createAsyncTypes, createAsyncActions } from '../reducersFactory';
import { handleActions } from 'redux-actions';
import { sortBy } from '../../utils/ArrayUtils';
import { updateItemInArray } from '../reducersUtils';

const stateKey = 'comments';

/* Actions Types */
export const types = {
    GET_ALL_COMMENTS_BY_POST: createAsyncTypes(stateKey, 'GET_ALL_COMMENTS_BY_POST'),
    SAVE_COMMENT: createAsyncTypes(stateKey, 'SAVE_COMMENT'),
    DELETE_COMMENT: createAsyncTypes(stateKey, 'DELETE_COMMENT'),
    UPDATE_COMMENT: createAsyncTypes(stateKey, 'UPDATE_COMMENT'),
    VOTE_UP: createAsyncTypes(stateKey, 'VOTE_UP'),
    VOTE_DOWN: createAsyncTypes(stateKey, 'VOTE_DOWN')
};

/* Actions */
export const actions = {
    getAllCommentsByPost: createAsyncActions(types.GET_ALL_COMMENTS_BY_POST),
    saveComment: createAsyncActions(types.SAVE_COMMENT),
    updateComment: createAsyncActions(types.UPDATE_COMMENT),
    deleteComment: createAsyncActions(types.DELETE_COMMENT),
    voteUp: createAsyncActions(types.VOTE_UP),
    voteDown: createAsyncActions(types.VOTE_DOWN)
};

/* Reducer */
const initialState = [];

/* Reducers */
export default handleActions(
    {
        [types.SAVE_COMMENT.SUCCESS]: (state, action) => [...state, action.payload],
        [types.GET_ALL_COMMENTS_BY_POST.SUCCESS]: (state, action) => [...action.payload],
        [types.DELETE_COMMENT.SUCCESS]: (state, action) => {
            return state.filter((post) => post.id !== action.payload.id);
        },
        [types.VOTE_UP.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        },
        [types.VOTE_DOWN.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        },
        [types.UPDATE_COMMENT.SUCCESS]: (state, action) => {
            return updateItemInArray(state, action.payload.id, () => action.payload);
        }
    },
    initialState
);

/* Selectors */
const getComments = (state) => sortBy(state.comments, 'voteScore');

export const selectors = {
    getComments
};

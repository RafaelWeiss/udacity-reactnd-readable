import {takeEvery, put} from 'redux-saga/effects';

import {types as postsTypes, actions as postsActions} from '../reducers/postsReducer';

import sagaApi from '../sagaApi';
import postsService from '../../services/postsService';
import {showErrorMessage} from '../../commons/notification/notification';


function* getAllPosts() {
    yield* sagaApi(
        postsService.getAllPosts,
        {},
        postsActions.getAllPosts.success
    );
}

function* getCategoryPosts(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.getByCategory,
        payload,
        postsActions.getCategoryPosts.success
    );
}

function* getPostById(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.getById,
        payload,
        function* (data) {
            yield put(data.id
                ? postsActions.getPostById.success(data)
                : showErrorMessage('msg.postNotFound')
            );
        },
        null,
        null,
        null,
        {callSuccessFunction: true}
    );
}

function* createPost(action) {
    const {payload} = action;
    
    yield* sagaApi(
        postsService.savePost,
        payload,
        postsActions.savePost.success,
        'msg.postSaveSuccess'
    );
}

function* voteUpPost(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.voteUp,
        payload.id,
        postsActions.voteUp.success,
        'msg.voteAddSuccess'
    );
}

function* voteDownPost(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.voteDown,
        payload.id,
        postsActions.voteDown.success,
        'msg.voteAddSuccess'
    );
}

function* deletePost(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.removePost,
        payload.id,
        postsActions.deletePost.success,
        'msg.postDeleteSuccess'
    );
}

function* updatePost(action) {
    const {payload} = action;

    yield* sagaApi(
        postsService.updatePost,
        payload,
        postsActions.updatePost.success,
        'msg.postUpdateSuccess'
    );
}

export default function* postsSaga() {
    yield takeEvery(postsTypes.GET_ALL_POSTS.REQUEST, getAllPosts);
    yield takeEvery(postsTypes.GET_CATEGORY_POSTS.REQUEST, getCategoryPosts);
    yield takeEvery(postsTypes.GET_POST_BY_ID.REQUEST, getPostById);
    yield takeEvery(postsTypes.SAVE_POST.REQUEST, createPost);
    yield takeEvery(postsTypes.VOTE_UP.REQUEST, voteUpPost);
    yield takeEvery(postsTypes.VOTE_DOWN.REQUEST, voteDownPost);
    yield takeEvery(postsTypes.DELETE_POST.REQUEST, deletePost);
    yield takeEvery(postsTypes.UPDATE_POST.REQUEST, updatePost);
}
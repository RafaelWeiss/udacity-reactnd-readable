import { takeEvery } from 'redux-saga/effects';

import { types as commentsTypes, actions as commentsActions } from '../reducers/commentsReducer';

import sagaApi from '../sagaApi';
import commentsService from '../../services/commentsService';

function* getAllCommentsByPost({ payload }) {
    yield* sagaApi(commentsService.getAllCommentsByPost, payload, commentsActions.getAllCommentsByPost.success);
}

function* voteUpComment({ payload }) {
    yield* sagaApi(
        commentsService.voteUp,
        payload.id,
        commentsActions.voteUp.success,
        'msg.voteAddSuccess'
    );
}

function* voteDownComment({ payload }) {
    yield* sagaApi(
        commentsService.voteDown,
        payload.id,
        commentsActions.voteDown.success,
        'msg.voteAddSuccess'
    );
}

function* deleteComment({ payload }) {
    yield* sagaApi(
        commentsService.removeComment,
        payload.id,
        commentsActions.deleteComment.success,
        'msg.commentDeleteSuccess'
    );
}

function* updateComment({ payload }) {
    yield* sagaApi(
        commentsService.updateComment,
        payload,
        commentsActions.updateComment.success,
        'msg.commentUpdateSuccess'
    );
}

function* saveComment({ payload }) {
    yield* sagaApi(
        commentsService.saveComment,
        payload,
        commentsActions.saveComment.success,
        'msg.commentAddSuccess'
    );
}

export default function* commentsSaga() {
    yield takeEvery(commentsTypes.GET_ALL_COMMENTS_BY_POST.REQUEST, getAllCommentsByPost);
    yield takeEvery(commentsTypes.VOTE_UP.REQUEST, voteUpComment);
    yield takeEvery(commentsTypes.VOTE_DOWN.REQUEST, voteDownComment);
    yield takeEvery(commentsTypes.DELETE_COMMENT.REQUEST, deleteComment);
    yield takeEvery(commentsTypes.UPDATE_COMMENT.REQUEST, updateComment);
    yield takeEvery(commentsTypes.SAVE_COMMENT.REQUEST, saveComment);
}

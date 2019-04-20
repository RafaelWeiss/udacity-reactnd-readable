import request from '../commons/http/request';

const API_URL_BASE = `/comments`;

export default {
    getAllCommentsByPost: (postId) => request.query(`/posts/${postId}/comments`),
    voteUp: (commentId) => request.save(`${API_URL_BASE}/${commentId}`, { option: 'upVote' }),
    voteDown: (commentId) => request.save(`${API_URL_BASE}/${commentId}`, { option: 'downVote' }),
    removeComment: (commentId) => request.remove(`${API_URL_BASE}/${commentId}`),
    saveComment: (comment) => request.save(API_URL_BASE, comment),
    updateComment: (comment) => request.update(`${API_URL_BASE}/${comment.id}`, comment)
};

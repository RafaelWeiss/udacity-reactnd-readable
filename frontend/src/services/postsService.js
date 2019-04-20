import request from '../commons/http/request';


const API_URL_BASE = `/posts`;

export default {
    getByCategory: category => request.query(`/${category}${API_URL_BASE}`),
    getAllPosts: () => request.query(API_URL_BASE),
    savePost: post => request.save(API_URL_BASE, post),
    updatePost: post => request.update(`${API_URL_BASE}/${post.id}`, post),
    getById: postId => request.get(`${API_URL_BASE}/${postId}`),
    voteUp: postId => request.save(`${API_URL_BASE}/${postId}`, {option: 'upVote'}),
    voteDown: postId => request.save(`${API_URL_BASE}/${postId}`, {option: 'downVote'}),
    removePost: postId => request.remove(`${API_URL_BASE}/${postId}`)
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';

import {
    actions as postsActions,
    selectors as postsSelectors
} from '../store/reducers/postsReducer';
import {
    actions as commentActions,
    selectors as commentSelectors
} from '../store/reducers/commentsReducer';
import {
    actions as categoriesActions,
    selectors as categoriesSelectors
} from '../store/reducers/categoriesReducer';

import PostCommentsList from './components/PostCommentList';
import CommentPropType from './prop-types/CommentPropType';
import CategoryPropType from './prop-types/CategoryPropType';
import PostPropType from './prop-types/PostPropType';
import PostModal from './components/PostModal';
import PostCard from './components/PostCard';
import PageOptions from './components/PageOptions';

class PostPage extends Component {
    state = {
        editModalOpen: false
    };

    componentDidMount() {
        const {
            match,
            getPostById,
            post,
            getAllCommentsByPost,
            getAllCategories,
            categories
        } = this.props;
        const postLoaded = post && post.id;
        const postId = postLoaded ? post.id : match.params.post;
        !categories.length && getAllCategories();
        !postLoaded && getPostById(postId);
        getAllCommentsByPost(postId);
    }

    getBackUrl() {
        const { match, location } = this.props;
        const { category } = match.params;
        const { state } = location;

        return state && state.from ? state.from : `/${category}`;
    }

    handleBack = () => {
        const { history } = this.props;
        history.push(this.getBackUrl());
    };

    handleVoteUp = () => {
        const { voteUp, post } = this.props;
        voteUp(post);
    };

    handleVoteDown = () => {
        const { voteDown, post } = this.props;
        voteDown(post);
    };

    handleSavePostModal = (post) => {
        const { updatePost } = this.props;

        updatePost(post);
        this.setState({ editModalOpen: false });
    };

    handleEditPost = () => {
        this.setState({ editModalOpen: true });
    };

    handleCancelPostModal = () => {
        this.setState({ editModalOpen: false });
    };

    handleRemovePost = () => {
        const { history, post } = this.props;
        this.props.deletePost(post);
        history.push(this.getBackUrl());
    };

    render() {
        const { editModalOpen } = this.state;
        const { post, comments, categories, intl } = this.props;
        return (
            <div className="page-content">
                <PageOptions showBackButton={true}/>
                {post && (
                    <div>
                        <PostCard
                            post={post}
                            onEditPost={this.handleEditPost}
                            onRemovePost={this.handleRemovePost}
                            onVoteDown={this.handleVoteDown}
                            onVoteUp={this.handleVoteUp}
                            onOpenPost={this.handleOpenPost}
                        />
                        <PostCommentsList post={post} comments={comments} />
                        <PostModal
                            open={editModalOpen}
                            categories={categories}
                            post={post}
                            onCancel={this.handleCancelPostModal}
                            onSavePost={this.handleSavePostModal}
                        />
                    </div>
                )}
                {!post && (
                    <div className="page-notfound">
                        {intl.formatMessage({ id: 'msg.postNotFound' })}
                    </div>
                )}
            </div>
        );
    }
}

PostPage.defaultProps = {
    post: undefined,
    comments: [],
    categories: []
};

PostPage.propTypes = {
    post: PostPropType,
    comments: PropTypes.arrayOf(CommentPropType),
    categories: PropTypes.arrayOf(CategoryPropType),
    getPostById: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    getAllCommentsByPost: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { match } = ownProps;
    return {
        post: postsSelectors.getPost(state, match.params.post),
        comments: commentSelectors.getComments(state),
        categories: categoriesSelectors.getCategories(state)
    };
};

const mapDispatchToProps = {
    getPostById: postsActions.getPostById.request,
    updatePost: postsActions.updatePost.request,
    deletePost: postsActions.deletePost.request,
    voteUp: postsActions.voteUp.request,
    voteDown: postsActions.voteDown.request,
    getAllCategories: categoriesActions.getAllCategories.request,
    getAllCommentsByPost: commentActions.getAllCommentsByPost.request
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(PostPage);

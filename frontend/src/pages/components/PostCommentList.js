import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Button } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import uuidv1 from 'uuid/v1';
import { actions as commentsActions } from '../../store/reducers/commentsReducer';

import CommentCard from './CommentCard';
import PostCommentModal from './PostCommentModal';
import PostPropType from '../prop-types/PostPropType';
import CommentPropType from '../prop-types/CommentPropType';

class PostCommentsList extends Component {
    state = {
        selectedComment: undefined,
        commentModalOpen: false
    };

    handleSaveNewComment(comment) {
        const { saveComment, post } = this.props;
        this.setState({ commentModalOpen: false });
        saveComment({ ...comment, parentId: post.id ,  id: uuidv1(), timestamp: Date.now() });
    }

    handleUpdateComment(comment) {
        this.setState({ commentModalOpen: false, selectedComment: undefined });
        this.props.updateComment({ ...comment, timestamp: Date.now() });
    }

    handleSaveCommentModal = (comment) => {
        const { selectedComment } = this.state;
        selectedComment ? this.handleUpdateComment(comment) : this.handleSaveNewComment(comment);
    };

    handleNewComment = () => {
        this.setState({ commentModalOpen: true, selectedComment: undefined });
    };

    handleCancelCommentModal = () => {
        this.setState({ commentModalOpen: false, selectedPost: undefined });
    };

    handleVoteUp = (comment) => {
        this.props.voteUp(comment);
    };

    handleVoteDown = (comment) => {
        this.props.voteDown(comment);
    };

    handleEditComment = (comment) => {
        this.setState({ commentModalOpen: true, selectedComment: comment });
    };

    handleRemoveComment = (comment) => {
        this.props.deleteComment(comment);
    };

    render() {
        const { commentModalOpen, selectedComment } = this.state;
        const { comments } = this.props;


        return (
            <div className="post-comment-list text-center">
                {comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        onVoteUp={this.handleVoteUp}
                        onVoteDown={this.handleVoteDown}
                        onEditComment={this.handleEditComment}
                        onRemoveComment={this.handleRemoveComment}
                    />
                ))}
                <br />
                <Button color="primary" onClick={this.handleNewComment}>
                    <FormattedMessage id="button.newComment" />
                </Button>

                <PostCommentModal
                    open={commentModalOpen}
                    comment={selectedComment}
                    onCancel={this.handleCancelCommentModal}
                    onSaveComment={this.handleSaveCommentModal}
                />
            </div>
        );
    }
}

PostCommentsList.defaultProps = {
    comments: []
};

PostCommentsList.propTypes = {
    post: PostPropType,
    comments: PropTypes.arrayOf(CommentPropType),
    /* actions */
    saveComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    saveComment: commentsActions.saveComment.request,
    updateComment: commentsActions.updateComment.request,
    deleteComment: commentsActions.deleteComment.request,
    voteUp: commentsActions.voteUp.request,
    voteDown: commentsActions.voteDown.request
};

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(PostCommentsList);

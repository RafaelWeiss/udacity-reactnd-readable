import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faThumbsDown,
    faEdit,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { injectIntl, FormattedDate } from 'react-intl';
import PostPropType from '../prop-types/PostPropType';
import withDialog from '../../components/AppDialog/withDialog';
import { Link } from 'react-router-dom';

function PostCard(props) {
    const voteUp = () => {
        const { post, onVoteUp } = props;
        onVoteUp(post);
    };

    const voteDown = () => {
        const { post, onVoteDown } = props;
        onVoteDown(post);
    };

    const editPost = () => {
        const { post, onEditPost } = props;
        onEditPost(post);
    };

    const removePost = () => {
        const { intl, confirm, post, onRemovePost } = props;
        confirm(intl.formatMessage({ id: 'msg.postRemoveDialog' }), () => {
            onRemovePost(post);
        });
    };

    const { post, intl } = props;

    return (
        <div>
            <Card key={post.id}>
                <CardHeader className="post-card-header">
                    <Link to={`/${post.category}/${post.id}`} key={post.id}>
                        <span>{post.title}</span>
                    </Link>
                    <div className="post-card-header-options">
                        <Button color="secondary" onClick={editPost}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button color="secondary" onClick={removePost}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="title-area">
                        <CardTitle>
                            <span className="post-author">
                                {intl.formatMessage({ id: 'label.by' })}:{' '}
                            </span>
                            {post.author}
                            <span className="post-category">
                                {intl.formatMessage({ id: 'label.category' })}:{' '}
                            </span>
                            {post.category}
                        </CardTitle>
                        <span className="card-time">
                            <FormattedDate
                                value={new Date(post.timestamp)}
                                day="2-digit"
                                month="2-digit"
                                year="numeric"
                            />
                        </span>
                    </div>
                    <CardText>{post.body}</CardText>
                </CardBody>
                <CardFooter>
                    <Link to={`/${post.category}/${post.id}`} key={post.id}>
                        <span className="total-comments">
                            {post.commentCount} {intl.formatMessage({ id: 'label.comments' })}
                        </span>
                    </Link>
                    <div className="">
                        <Button color="info" onClick={voteUp}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            &nbsp;{post.voteScore}
                        </Button>
                        <Button color="danger" onClick={voteDown}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

PostCard.defaultProps = {};

PostCard.propTypes = {
    post: PostPropType.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onRemovePost: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

export default compose(
    withDialog,
    injectIntl
)(PostCard);

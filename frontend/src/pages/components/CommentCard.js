import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { injectIntl, FormattedDate } from 'react-intl';
import withDialog from '../../components/AppDialog/withDialog';

import CommentPropType from '../prop-types/CommentPropType';

function CommentCard(props) {
    const voteUp = () => {
        const { comment, onVoteUp } = props;
        onVoteUp(comment);
    };

    const voteDown = () => {
        const { comment, onVoteDown } = props;
        onVoteDown(comment);
    };

    const editComment = () => {
        const { comment, onEditComment } = props;
        onEditComment(comment);
    };

    const removeComment = () => {
        const { intl, confirm, comment, onRemoveComment } = props;
        confirm(intl.formatMessage({ id: 'msg.commentRemoveDialog' }), () => {
            onRemoveComment(comment);
        });
    };

    const { comment, intl } = props;

    return (
        <div>
            <Card key={comment.id} className="comment-card">
                <CardBody>
                    <div className="comments-top">
                        <div className="comment-space">
                            <div>{intl.formatMessage({ id: 'label.by' })}:{' '}{comment.author}</div>    
                        </div>
                        <span className="card-time">
                            <FormattedDate
                                value={new Date(comment.timestamp)}
                                day="2-digit"
                                month="2-digit"
                                year="numeric"
                            />
                        </span>
                    </div>
                    <CardText>{comment.body}</CardText>
                    <div className="comment-buttons">
                        <Button color="info" onClick={voteUp}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            &nbsp;{comment.voteScore}
                        </Button>
                        <Button color="danger" onClick={voteDown}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </Button>
                        <Button color="secondary" onClick={editComment}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button color="secondary" onClick={removeComment}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

CommentCard.defaultProps = {};

CommentCard.propTypes = {
    comment: CommentPropType.isRequired,
    onEditComment: PropTypes.func.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

export default compose(
    withDialog,
    injectIntl
)(CommentCard);

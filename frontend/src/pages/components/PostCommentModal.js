import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import AppModal from '../../components/AppModal/AppModal';
import CommentForm from './CommentForm';
import CommentPropType from '../prop-types/CommentPropType';

function PostCommentModal(props) {
    const handleSaveClick = (comment) => {
        const { onSaveComment } = props;
        onSaveComment(comment);
    };

    const { intl, open, comment, title, onCancel } = props;

    return (
        <AppModal
            open={open}
            onCancel={onCancel}
            title={title || intl.formatMessage({ id: 'title.comment' })}
            hideFooter={true}>
            <CommentForm comment={comment} onSubmit={handleSaveClick} onCancel={onCancel} />
        </AppModal>
    );
}

PostCommentModal.defaultProps = {
    comment: {},
    title: '',
    open: false
};

PostCommentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    comment: CommentPropType,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(PostCommentModal);

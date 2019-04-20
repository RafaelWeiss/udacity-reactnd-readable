import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import AppModal from '../../components/AppModal/AppModal';
import CategoryPropType from '../prop-types/CategoryPropType';
import PostForm from './PostForm';
import PostPropType from '../prop-types/PostPropType';


function PostModal(props) {
    const handleSaveClick = post => {
        const {onSavePost} = props;
        onSavePost(post);
    };

    const {
        intl,
        open,
        post,
        title,
        category,
        onCancel,
        categories
    } = props;

    return (
        <AppModal
            open={open}
            title={title || intl.formatMessage({id: 'title.post'})}
            onCancel={onCancel}
            hideFooter={true}
        >
            {Boolean(categories.length) && (
                <PostForm
                    post={post}
                    category={category}
                    onSubmit={handleSaveClick}
                    onCancel={onCancel}
                    categories={categories}
                />
            )}
        </AppModal>
    );
}

PostModal.defaultProps = {
    post: {},
    title: '',
    open: false,
    categories: []
};

PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PostPropType,
    title: PropTypes.string,
    category: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSavePost: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(CategoryPropType),
    intl: PropTypes.object.isRequired
};

export default injectIntl(PostModal);
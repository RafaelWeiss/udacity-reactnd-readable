import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import uuidv1 from 'uuid/v1';
import {
    actions as postsActions,
    selectors as postsSelectors
} from '../../store/reducers/postsReducer';
import {
    actions as categoriesActions,
    selectors as categoriesSelectors
} from '../../store/reducers/categoriesReducer';
import {
    actions as filterActions,
    selectors as filterSelectors
} from '../../store/reducers/postsFilterReducer';

import CategoryPropType from '../prop-types/CategoryPropType';
import CategoryFilter from './CategoryFilter';
import OrderByFilter from './OrderByFilter';
import PostPropType from '../prop-types/PostPropType';
import PostModal from './PostModal';
import PostCard from './PostCard';
import PageOptions from './PageOptions';

class PostList extends Component {
    state = {
        postModalOpen: false,
        selectedPost: undefined
    };

    componentDidMount() {
        const { getAllCategories } = this.props;
        getAllCategories();
    }

    handleOpenPost = (post) => {
        const { history } = this.props;
        const { id, category } = post;
        history.push(`${category}/${id}`, { from: history.location.pathname });
    };

    handleSaveNewPost(post) {
        this.props.savePost({
            ...post,
            id: uuidv1(),
            timestamp: Date.now()
        });
        this.setState({ postModalOpen: false });
    }

    handleUpdatePost(post) {
        this.props.updatePost(post);
        this.setState({ postModalOpen: false, selectedPost: undefined });
    }

    handleSavePostModal = (post) => {
        const { selectedPost } = this.state;
        selectedPost ? this.handleUpdatePost(post) : this.handleSaveNewPost(post);
    };

    handleCancelPostModal = () => {
        this.setState({ postModalOpen: false, selectedPost: undefined });
    };

    handleNewPost = () => {
        this.setState({ postModalOpen: true });
    };

    handleVoteUp = (post) => {
        this.props.voteUp(post);
    };

    handleVoteDown = (post) => {
        this.props.voteDown(post);
    };

    handleEditPost = (post) => {
        this.setState({ postModalOpen: true, selectedPost: post });
    };

    handleRemovePost = (post) => {
        this.props.deletePost(post);
    };

    handleChangeOrderByFilter = (orderBy) => {
        const { updatePostsFilter } = this.props;
        updatePostsFilter({ orderBy });
    };

    handleChangeCategoryFilter = (category) => {
        const { updatePostsFilter, history } = this.props;

        updatePostsFilter({ category });
        history.push(category, { category });
    };

    render() {
        const { intl, posts, categories, orderBy, category } = this.props;
        const { postModalOpen, selectedPost } = this.state;
        return (
            <div className="page-content">
                <PageOptions>
                    <CategoryFilter
                        selected={category}
                        options={categories}
                        onChange={this.handleChangeCategoryFilter}
                    />
                    <OrderByFilter selected={orderBy} onChange={this.handleChangeOrderByFilter} />
                    <Button
                        color="primary"
                        onClick={this.handleNewPost}
                        title={intl.formatMessage({ id: 'button.newPost' })}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                        &nbsp;{intl.formatMessage({ id: 'button.newPost' })}
                    </Button>
                </PageOptions>

                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onEditPost={this.handleEditPost}
                        onRemovePost={this.handleRemovePost}
                        onVoteDown={this.handleVoteDown}
                        onVoteUp={this.handleVoteUp}
                        onOpenPost={this.handleOpenPost}
                    />
                ))}

                <PostModal
                    open={postModalOpen}
                    categories={categories}
                    category={category}
                    post={selectedPost}
                    onCancel={this.handleCancelPostModal}
                    onSavePost={this.handleSavePostModal}
                />
            </div>
        );
    }
}

PostList.defaultProps = {
    posts: [],
    categories: []
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(PostPropType),
    orderBy: PropTypes.string,
    category: PropTypes.string,
    categories: PropTypes.arrayOf(CategoryPropType),
    getAllPosts: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    updatePostsFilter: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const orderBy = filterSelectors.getSelectedOderby(state);
    const category = filterSelectors.getSelectedCategory(state);

    return {
        posts: postsSelectors.getPosts(state, orderBy, category),
        categories: categoriesSelectors.getCategories(state),
        orderBy,
        category
    };
};

const mapDispatchToProps = {
    getAllPosts: postsActions.getAllPosts.request,
    savePost: postsActions.savePost.request,
    updatePost: postsActions.updatePost.request,
    deletePost: postsActions.deletePost.request,
    voteUp: postsActions.voteUp.request,
    voteDown: postsActions.voteDown.request,
    getAllCategories: categoriesActions.getAllCategories.request,
    ...filterActions
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(PostList);

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connect} from 'react-redux';


import { actions as postsActions } from '../store/reducers/postsReducer';

import PostList from './components/PostList';
import {actions as filterActions, selectors as filterSelectors} from '../store/reducers/postsFilterReducer';


class CategoryPosts extends Component {
    componentDidMount() {
        const {getCategoryPosts, updatePostsFilter, match, history, category} = this.props;
        const categoryParam = match.params.category;
        if (!category || category !== categoryParam) {
            updatePostsFilter({category: categoryParam});
        }
        getCategoryPosts(categoryParam);
        this.unlisten = history.listen(location => {
            if (location.state){
                const {category} = location.state;
                category && getCategoryPosts(category);
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return <PostList/>;
    }
}

CategoryPosts.propTypes = {
    category: PropTypes.string,
    getCategoryPosts: PropTypes.func.isRequired,
    updatePostsFilter: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    category: filterSelectors.getSelectedCategory(state)
});

const mapDispatchToProps = {
    getCategoryPosts : postsActions.getCategoryPosts.request,
    ...filterActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(CategoryPosts);
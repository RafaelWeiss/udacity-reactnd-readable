import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as postsActions } from '../store/reducers/postsReducer';
import PostList from './components/PostList';
import {actions as filterActions} from '../store/reducers/postsFilterReducer';

export class AllPosts extends Component {
    componentDidMount() {
        this.props.getAllPosts();
        this.props.updatePostsFilter({category: ''});
    }

    render() {
        return <PostList />;
    }
}

AllPosts.propTypes = {
    getAllPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    getAllPosts: postsActions.getAllPosts.request,
    ...filterActions
    
};

export default connect(
    null,
    mapDispatchToProps
)(AllPosts);

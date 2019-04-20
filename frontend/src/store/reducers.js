import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import loading from './reducers/loadingReducer';
import categories from './reducers/categoriesReducer';
import posts from './reducers/postsReducer';
import comments from './reducers/commentsReducer';
import postsFilter from './reducers/postsFilterReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
    notifications,
    loading,
    categories,
    postsFilter,
    posts,
    comments,
    router: connectRouter(history)
})

export default rootReducer
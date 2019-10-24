import { combineReducers } from 'redux';
import articles from './articles_reducer';
import users from './users_reducer';
import comments from './comments_reducer';

export default combineReducers({
    articles,
    users,
    comments
})
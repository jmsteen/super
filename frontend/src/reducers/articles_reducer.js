import { RECEIVE_ARTICLES, RECEIVE_USER_ARTICLES, RECEIVE_ARTICLE, CLEAR_ARTICLES } from '../actions/article_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { merge } from 'lodash';

const ArticlesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ARTICLES:
            return merge(newState, action.articles);
        case RECEIVE_USER_ARTICLES:
            return action.articles.data;
        case RECEIVE_ARTICLE:
           return { [action.article.data._id]: action.article.data };
        case CLEAR_ARTICLES:
            return {};
        case RECEIVE_LIKE:
            if (action.like.article) {
                const articleId = action.like.article;
                const article = newState[articleId];
                article.likes = article.likes.filter(like => like._id !== action.like._id);
                article.likes.push(action.like);
                return newState;
            } else {
                return state;
            }
        case REMOVE_LIKE:
            if (action.like.article) {
                const articleId = action.like.article;
                const article = newState[articleId];
                article.likes = article.likes.filter(like => like._id !== action.like._id);
                return newState;
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default ArticlesReducer;
import { RECEIVE_ARTICLES, RECEIVE_USER_ARTICLES, RECEIVE_ARTICLE } from '../actions/article_actions';
import { RECEIVE_LIKE } from '../actions/like_actions';

const ArticlesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ARTICLES:
            return action.articles.data;
        case RECEIVE_USER_ARTICLES:
            return action.articles.data;
        case RECEIVE_ARTICLE:
           return { [action.article.data.id]: action.article.data };
        // case RECEIVE_LIKE:
        //     if (action.like.articleId) {
        //         const articleId = action.like.articleId;
        //         newState[articleId].likes = newState[articleId].likes.filter(like => like._id !== action.like._id);
        //         newState[articleId].likes.push(action.like);
        //         return newState;
        //     } else {
        //         return state;
        //     }
        // Saving this until I know what the shape of 'articles' looks like!
        default:
            return state;
    }
};

export default ArticlesReducer;
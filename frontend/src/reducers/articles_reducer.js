import { RECEIVE_ARTICLES, RECEIVE_USER_ARTICLES, RECEIVE_ARTICLE } from '../actions/article_actions';


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
        default:
            return state;
    }
};

export default ArticlesReducer;
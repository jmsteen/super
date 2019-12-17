import { getArticle, getArticles, getUserArticles, writeArticle, updateArticle, deleteArticle, getArticlePage } from '../util/article_api_util';

export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const RECEIVE_USER_ARTICLES = "RECEIVE_USER_ARTICLES";
export const CLEAR_ARTICLES = "CLEAR_ARTICLES";

export const clearArticles = () => ({
    type: CLEAR_ARTICLES
});

export const receiveArticles = data => ({
    type: RECEIVE_ARTICLES,
    articles: data.articles,
    total: data.total
});

export const receiveUserArticles = articles => ({
    type: RECEIVE_USER_ARTICLES,
    articles
});

export const receiveArticle = article => ({
        type: RECEIVE_ARTICLE,
        article
});

// don't use fetchArticles unless it's fixed for the current configuration!
export const fetchArticles = () => dispatch => (
    getArticles()
        .then(articles => dispatch(receiveArticles(articles)))
        .catch(err => console.log(err))
);

export const fetchArticle = (id) => dispatch => (
    getArticle(id)
        .then(article => {
            dispatch(receiveArticle(article))
            return article
        })
        .catch(err => console.log(err))
);

export const fetchArticlePage = page => dispatch => (
    getArticlePage(page)
        .then(res => dispatch(receiveArticles(res.data)))
        .catch(err => console.log(err))
);

export const eraseArticle = id => dispatch => {
    return deleteArticle(id)
};

export const fetchUserArticles = id => dispatch => (
    getUserArticles(id)
        .then(articles => dispatch(receiveUserArticles(articles)))
        .catch(err => console.log(err))
);

export const composeArticle = data => dispatch => {
    return writeArticle(data)
        .then(article => {
            dispatch(receiveArticle(article));
            return article;
        })
        .catch(err => console.log(err))
};

export const reviseArticle = data => dispatch => {
    return updateArticle(data)
        .then(article => {
            dispatch(receiveArticle(article));
            return article;
        })
        .catch(err => console.log(err))
    };
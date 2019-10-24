import { getArticle, getArticles, getUserArticles, writeArticle, updateArticle } from '../util/article_api_util';

export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const RECEIVE_USER_ARTICLES = "RECEIVE_USER_ARTICLES";

export const receiveArticles = articles => ({
    type: RECEIVE_ARTICLES,
    articles
});

export const receiveUserArticles = articles => ({
    type: RECEIVE_USER_ARTICLES,
    articles
});

export const receiveArticle = article => ({
    type: RECEIVE_ARTICLE,
    article
})

export const fetchArticles = () => dispatch => (
    getArticles()
        .then(articles => dispatch(receiveArticles(articles)))
        .catch(err => console.log(err))
);

export const fetchArticle = (id) => dispatch => (
    getArticle(id)
<<<<<<< HEAD
        .then(article => {
            dispatch(receiveArticle(article))
            return article
=======
        .then(article => { 
            dispatch(receiveArticle(article))
            return article;
>>>>>>> 2cdac7c... create comments index
        })
        .catch(err => console.log(err))
);

export const fetchUserArticles = id => dispatch => (
    getUserArticles(id)
        .then(articles => dispatch(receiveUserArticles(articles)))
        .catch(err => console.log(err))
);

export const composeArticle = data => dispatch => (
    writeArticle(data)
        .then(article => dispatch(receiveArticle(article)))
        .catch(err => console.log(err))
);

export const reviseArticle = data => dispatch => (
    updateArticle(data)
        .then(article => dispatch(receiveArticle(article)))
        .catch(err => console.log(err))
);
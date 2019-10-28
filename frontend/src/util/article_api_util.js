import axios from 'axios';

export const getArticles = () => {
    return axios.get('/api/articles')
};

export const getArticle = (id) => {
    return axios.get(`/api/articles/${id}`);
};

export const getUserArticles = id => {
    return axios.get(`/api/user/${id}/articles`);
};

export const writeArticle = data => {
    return axios.post('/api/articles/', data);
};

export const updateArticle = data => {
    return axios.patch(`/api/articles/${data.id}`, data);
};

export const deleteArticle = id => {
    return axios.delete(`/api/articles/${id}`);
};
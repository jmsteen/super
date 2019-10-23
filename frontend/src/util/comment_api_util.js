import axios from 'axios';

export const createLike = data => {
  return axios.post('/api/comments/', data)
};

export const deleteLike = id => {
  return axios.delete(`/api/comments/${id}`)
};
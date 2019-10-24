import axios from 'axios';

export const createComment = data => {
  return axios.post('/api/comments', data)
};

export const deleteComment = id => {
  return axios.delete(`/api/comments/${id}`)
};
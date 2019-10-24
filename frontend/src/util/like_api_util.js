import axios from 'axios';

export const createLike = data => {
  return axios.post('/api/likes/', data)
};

export const incrementLike = id => {
  return axios.patch(`/api/likes/${id}`)
};

export const deleteLike = id => {
  return axios.delete(`/api/likes/${id}`)
};
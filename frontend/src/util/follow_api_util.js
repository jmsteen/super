import axios from 'axios';

export const createFollow = data => {
  return axios.post('/api/follows/', data)
};

export const deleteFollow = id => {
  return axios.delete(`/api/follows/${id}`)
};

export const getUserFollows = userId => {
  return axios.get(`/api/follows/${userId}`)
};
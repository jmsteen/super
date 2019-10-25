import axios from 'axios';

export const getUser = id => {
  return axios.get(`/api/users/${id}`);
};

export const getUserByHandle = handle => {
  return axios.get(`/api/users/handle/${handle}`);
};

export const updateUser = user => {
  return axios.patch(`/api/users/${user._id}`, user);
};
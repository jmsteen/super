import axios from 'axios';

export const getSimpleResults = filter => {
  return axios.get(`/api/search/simple/${filter}`)
};
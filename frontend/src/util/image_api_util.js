import axios from 'axios';

export const uploadImage = file => {
  if (file === undefined) return Promise.resolve();
  let data = new FormData();
  data.append("image", file);
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };

  return axios.post('/api/images/upload', data, config)
};
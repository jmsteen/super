import { getUser, getUserByHandle, updateUser } from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const editUser = user => dispatch => {
  return updateUser(user)
    .then(res => dispatch(receiveUser(res.data)))
    .catch(err => console.log(err));
};

export const fetchUser = id => dispatch => {
  return getUser(id)
    .then(res => dispatch(receiveUser(res.data)))
    .catch(err => console.log(err))
};

export const fetchUserByHandle = handle => dispatch => {
  return getUserByHandle(handle)
    .then(res => dispatch(receiveUser(res.data)))
    .catch(err => console.log(err))
};
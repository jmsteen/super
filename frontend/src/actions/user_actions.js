import { getUser, getUserByHandle, updateUser } from '../util/user_api_util';
import * as APIUtil from '../util/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const editUser = user => dispatch => {
  return updateUser(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);

      return dispatch(receiveUser(res.data.user))
    })
    .catch(err => dispatch(receiveUserErrors(err.response.data)));
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
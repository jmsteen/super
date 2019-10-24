import { createLike, incrementLike, deleteLike } from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

const removeLike = like => ({
  type: REMOVE_LIKE,
  like
});

export const makeLike = like => dispatch => {
  return createLike(like)
    .then(res => dispatch(receiveLike(res.data)))
    .catch(err => console.log(err))
};

export const increaseLike = id => dispatch => {
  return incrementLike(id)
    .then(res => dispatch(receiveLike(res.data)))
    .catch(err => console.log(err))
};

export const eraseLike = id => dispatch => {
  return deleteLike(id)
    .then(res => dispatch(removeLike(res.data)))
    .catch(err => console.log(err))
};

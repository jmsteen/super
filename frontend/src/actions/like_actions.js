import { createLike, incrementLike, deleteLike } from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKES";

const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

export const makeLike = like => dispatch => {
  createLike(like)
    .then(res => dispatch(receiveLike(res.data)))
    .catch(err => console.log(err))
};

export const increaseLike = id => dispatch => {
  incrementLike(id)
    .then(res => dispatch(receiveLike(res.data)))
    .catch(err => console.log(err))
};

export const eraseLike = id => dispatch => {
  deleteLike(id)
    .then(res => dispatch(receiveLike(res.data)))
    .catch(err => console.log(err))
};

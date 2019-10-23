import { createLike, incrementLike, deleteLike } from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_ARTICLES";

const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

const createLike = like => dispatch => {
  createLike(like)
    .then(newLike => dispatch(receiveLike(newLike)))
    .catch(err => console.log(err))
};

const incrementLike = id => dispatch => {
  incrementLike(id)
    .then(like => dispatch(receiveLike(like)))
    .catch(err => console.log(err))
};

const deleteLike = id => dispatch => {
  deleteLike(id)
    .then(like => dispatch(receiveLike(like)))
    .catch(err => console.log(err))
};

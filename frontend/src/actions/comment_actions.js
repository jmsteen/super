import { createComment, deleteComment } from '../util/comment_api_util';

export const RECEIVE_COMMENT = "RECIEVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const removeComment = comment =>({
  type: REMOVE_COMMENT, 
  comment
})

export const composeComment = comment => dispatch => {
  createComment(comment)
    .then(newComment => dispatch(receiveComment(newComment)))
    .catch(err => console.log(err))
};

export const eraseComment = id => dispatch => {
  deleteComment(id)
    .then(comment => dispatch(receiveComment(comment)))
    .catch(err => console.log(err))
};
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_ARTICLE } from '../actions/article_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
    switch(action.type) {
      case RECEIVE_COMMENT: 
        newState = Object.assign({}, state, { [action.comment.data._id]: action.comment.data});
        return newState
      case RECEIVE_LIKE:
        if (action.like.comment) {
          const commentId = action.like.comment;
          const comment = newState[commentId];
          comment.likes = comment.likes.filter(like => like._id !== action.like._id);
          comment.likes.push(action.like);
          return newState;
        } else {
          return state;
        }
      case REMOVE_LIKE:
        if (action.like.comment) {
          const commentId = action.like.comment;
          const comment = newState[commentId];
          comment.likes = comment.likes.filter(like => like._id !== action.like._id);
          return newState;
        } else {
          return state;
        }
      case REMOVE_COMMENT: 
        newState = Object.assign({}, state)
        delete newState[action.comment.data.id]
        return newState
      case RECEIVE_ARTICLE:
        if (action.article.data.comments) {
          action.article.data.comments.forEach(comment => newState[comment._id] = comment);
        };
        return newState || {}
      default: 
        return state;
    }
}

export default commentsReducer;
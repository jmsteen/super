import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../util/comment_api_util';
import { RECEIVE_ARTICLE } from '../util/article_api_util';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState 
    switch(action.type) {
      case RECEIVE_COMMENT: 
        newState = Object.assign({}, state, { [action.comment.id]: action.comment});
        return newState
      case REMOVE_COMMENT: 
        newState = Object.assign({}, state)
        delete newState[action.comment.id]
        return newState
      case RECEIVE_ARTICLE:
        return action.comments
      default: 
        return state;
    }
}

export default commentsReducer;
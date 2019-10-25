import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_ARTICLE } from '../actions/article_actions'

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState 
    switch(action.type) {
      case RECEIVE_COMMENT: 
        newState = Object.assign({}, state, { [action.comment.data._id]: action.comment.data});
        return newState
      case REMOVE_COMMENT: 
        newState = Object.assign({}, state)
        delete newState[action.data.comment.id]
        return newState
      case RECEIVE_ARTICLE:
        return action.article.data.comments
      default: 
        return state;
    }
}

export default commentsReducer;
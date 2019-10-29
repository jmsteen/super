import { RECEIVE_FOLLOW, REMOVE_FOLLOW, RECEIVE_FOLLOWS } from '../actions/follow_actions';

const followsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return action.follows;
    case RECEIVE_FOLLOW:
      newState[action.follow._id] = action.follow;
      return newState;
    case REMOVE_FOLLOW:
      delete newState[action.follow._id];
      return newState;
    default:
      return state;
  }
}

export default followsReducer;
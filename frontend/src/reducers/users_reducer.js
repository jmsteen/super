import { RECEIVE_USER } from '../actions/user_actions';
//import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/follow_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  //let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_USER:
      if (action.user) {
        return { [action.user._id]: action.user };
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default usersReducer;
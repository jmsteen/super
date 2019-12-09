import { RECEIVE_USER, RECEIVE_PROFILE } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  //let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      let newState = Object.assign({}, state, {[action.currentUser.id]: action.currentUser});
      return newState;
    case RECEIVE_PROFILE:
      if (action.user) {
        return { [action.user._id]: action.user };
      } else {
        return {};
      }
    case RECEIVE_USER:
      return merge({}, state, { [action.user._id]: action.user });
    default:
      return state;
  }
};

export default usersReducer;
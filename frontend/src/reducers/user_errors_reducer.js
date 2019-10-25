import { RECEIVE_USER_ERRORS, RECEIVE_USER } from '../actions/user_actions';

export default function userErrorsReducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      if (action.errors.errmsg) {
        return { handle: "Handle must be unique" }
      } else {
        return action.errors;
      };
    case RECEIVE_USER:
      return {};
    default:
      return state;
  }
};
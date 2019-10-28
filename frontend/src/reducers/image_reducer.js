import { RECEIVE_IMAGE, CLEAR_IMAGE } from '../actions/image_actions';

const imageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_IMAGE:
      return { pub: action.image }
    case CLEAR_IMAGE:
      return {};
    default:
      return state;
  }
}

export default imageReducer;
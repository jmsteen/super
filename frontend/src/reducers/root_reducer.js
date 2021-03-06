import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import modal from './modal_reducer';
import entities from './entities_reducer';
import image from './image_reducer';

const RootReducer = combineReducers({
    session,
    errors,
    modal,
    entities,
    image
});

export default RootReducer;
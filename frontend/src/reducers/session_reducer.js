import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
    UPDATE_CURRENT_USER
} from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case UPDATE_CURRENT_USER:
            const newState = Object.assign({}, state);
            Object.keys(action.fields).forEach(field => {
                newState.user[field] = action.fields[field];
            });
            return newState;
        default:
            return state;
    }
}
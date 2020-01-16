import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, LOADING_USER_COMPLETE } from "../actions/userActions";

const initialState = {
    isAuthenticated: false,
    loading: false,
    profile: {},
    likes: [],
    notifications: []
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false,
                profile: {}
            }
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                profile: {...action.payload}
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            }
        case LOADING_USER_COMPLETE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default userReducers;
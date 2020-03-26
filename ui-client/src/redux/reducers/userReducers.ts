import { SIGNUP_SUCCESS, SIGNING_UP, GETTING_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, UPDATING_AVATAR, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE } from './../actions/userActions';

import { AUTH_SUCCESS, CLEAR_AUTH, AUTH_FAILURE, AUTH_SET_USER, SIGNUP_FAILURE } from "../actions/userActions";

const initialState = {
    authErrors: {},
    isAuthenticated: false,
    authenticating: false,
    loadingUser: false,
    profile: {},
    likes: [],
    notifications: [],
    signingUp: false,
    signupErrors: {},
    gettingUserProfile: false,
    getUserProfileErrors: {},
    updatingAvatar: false,
    updateAvatarErrors: {}
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authenticating: false,
                authErrors: {}
            };
        case CLEAR_AUTH:
            return {
                isAuthenticated: false,
                authenticating: false,
                profile: {},
                authErrors: {}
            }
        case AUTH_SET_USER:
            return {
                ...state,
                profile: { ...action.payload }
            }
        case AUTH_FAILURE:
            return {
                ...state,
                authErrors: { ...action.payload },
                authenticating: false
            }
        case SIGNING_UP:
            return {
                ...state,
                signingUp: true
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                signingUp: false,
                signupErrors: { ...action.payload }
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signingUp: false,
                signupErrors: {}
            }
        case GETTING_USER_PROFILE:
            return {
                ...state,
                gettingUserProfile: true
            }
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: { ...action.payload },
                gettingUserProfile: false,
                getUserProfileErrors: {}
            }
        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                gettingUserProfile: false,
                getUserProfileErrors: { ...action.payload }
            }

        case UPDATING_AVATAR:
            return {
                ...state,
                updatingAvatar: true
            }
        case UPDATE_AVATAR_SUCCESS:
            return {
                ...state,
                profile: { ...action.payload },
                updateAvatarErrors: {},
                updatingAvatar: false
            }
        case UPDATE_AVATAR_FAILURE:
            return {
                ...state,
                updateAvatarErrors: { ...action.payload },
                updatingAvatar: false
            }
        default:
            return state;
    }
}

export default userReducers;
import { createAction } from 'redux-action';
import axios from 'axios';
import { from } from "rxjs";

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTH_SET_USER = "AUTH_SET_USER";
export const CLEAR_AUTH = 'CLEAR_AUTH';

export const SIGNING_UP = "SIGNING_UP";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const GETTING_USER_PROFILE = "GETTING_USER_PROFILE";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILURE = "GET_USER_PROFILE_FAILURE";

export const UPDATING_AVATAR = "UPDATING_AVATAR";
export const UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS";
export const UPDATE_AVATAR_FAILURE = "UPDATE_AVATAR_FAILURE";

export const loginUser = (userData, history) => dispatch => {
    dispatch(setAuthenticating());
    from(axios.post("/login", userData))
        .subscribe(
            res => {
                dispatch(setAuthenticated());
                dispatch(setUser(res.data.user));
                history.push('/');
            },
            err => {
                let errors;
                if (err.response.status === 400) {
                    errors = { general: "Invalid credentials" };
                } else {
                    errors = { general: "Unable to login due to unknown errors" };
                }
                dispatch(setAuthErrors(errors));
            }
        )
};

export const signupUser = (userData, history) => dispatch => {
    dispatch(setSigningUp());
    from(axios.post("/signup", userData))
        .subscribe(
            () => {
                dispatch(setAuthenticated());
                dispatch(setSignupSuccess());
                history.push("/");
            },
            err => {
                let errors;
                if (err.response.status === 400) {
                    errors = {
                        general: "The data provided is invalid"
                    };
                } else {
                    errors = { general: "Unable to signup due to system errors" };
                }
                dispatch(setSignupErrors(errors))
            });
};

export const getUserProfile = (userId) => dispatch => {
    dispatch(setGettingUserProfile());
    from(axios.get(`/users/${userId}`))
        .subscribe(
            res => {
                dispatch(getUserProfileSuccess(res.data.user))
            },
            err => {
                dispatch(getUserProfileFailure({ general: err.message }));
            });
};

export const updateAvatar = (userId, formData) => dispatch => {
    dispatch(setUpdatingAvatar());
    from(axios.post(`/users/${userId}/updateAvatar`, formData, { headers: { "Content-Type": "multipart/form-data" } }))
        .subscribe(
            res => { 
                dispatch(updateAvatarSuccess(res.data));
            },
            err => {
                dispatch(updateAvatarFailure({ general: err.message }));
            }
        );
}

export const setAuthenticating = createAction(AUTHENTICATING);
export const setAuthenticated = createAction(AUTH_SUCCESS);
export const setUnauthenticated = createAction(CLEAR_AUTH);
export const setAuthErrors = createAction(AUTH_FAILURE);
export const setUser = createAction(AUTH_SET_USER);

export const setSigningUp = createAction(SIGNING_UP);
export const setSignupErrors = createAction(SIGNUP_FAILURE);
export const setSignupSuccess = createAction(SIGNUP_SUCCESS);

export const setGettingUserProfile = createAction(GETTING_USER_PROFILE);
export const getUserProfileSuccess = createAction(GET_USER_PROFILE_SUCCESS);
export const getUserProfileFailure = createAction(GET_USER_PROFILE_FAILURE);

export const setUpdatingAvatar = createAction(UPDATING_AVATAR);
export const updateAvatarSuccess = createAction(UPDATE_AVATAR_SUCCESS);
export const updateAvatarFailure = createAction(UPDATE_AVATAR_FAILURE);


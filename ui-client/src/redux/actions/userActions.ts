import { createAction } from 'redux-action';
import axios from 'axios';
import { from } from "rxjs";
import { clearErrors, setErrors, setLoadingUIComplete, setLoadingUI } from './uiActions';
import { tap } from "rxjs/operators";

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";
export const LOADING_USER_COMPLETE = "LOADING_USER_COMPLETE";

export const loginUser = (userData, history) => dispatch => {

    dispatch(setLoadingUI());
    dispatch(clearErrors());

    from(axios.post("/login", userData))
        .pipe(
            tap(_ => dispatch(setLoadingUIComplete()))
        )
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
                dispatch(setErrors(errors));
            });
};

export const signupUser = (userData, history) => dispatch => {
    console.log("Sign up user...");
    dispatch(setLoadingUI());
    from(axios.post("/signup", userData))
        .pipe(
            tap(_ => dispatch(setLoadingUIComplete()))
        )
        .subscribe(
            res => {
                dispatch(setAuthenticated());
                history.push("/");
            },
            err => {
                let errors;
                if (err.response.status === 400) {
                    errors = {
                        general: "Invalid credentials"
                    };
                } else {
                    errors = { general: "Unable to login due to unknown errors" };
                }
                dispatch(setErrors(errors))
            });
};

export const getUserData = (userId) => dispatch => {
    dispatch(setLoadingUser());
    from(axios.get(`/users/${userId}`))
        .pipe(
            tap(_ => dispatch(setLoadingUserComplete()))
        ).subscribe(
            res => {
                dispatch(setUser(res.data.user))
            },
            err => {
                dispatch(setErrors({ general: err.response.data }));
            });
};

export const setUser = createAction(SET_USER);
export const setAuthenticated = createAction(SET_AUTHENTICATED);
export const setUnauthenticated = createAction(SET_UNAUTHENTICATED);
export const setLoadingUser = createAction(SET_UNAUTHENTICATED);
export const setLoadingUserComplete = createAction(SET_UNAUTHENTICATED);
import { createAction } from 'redux-action';

export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const LOADING_UI_COMPLETE = "LOADING_UI_COMPLETE";

export const clearErrors = createAction(CLEAR_ERRORS);
export const setErrors = createAction(SET_ERRORS);
export const setLoadingUI = createAction(LOADING_UI);
export const setLoadingUIComplete = createAction(LOADING_UI_COMPLETE);
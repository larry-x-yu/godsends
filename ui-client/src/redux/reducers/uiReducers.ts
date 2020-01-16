import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_UI_COMPLETE } from "../actions/uiActions"

export interface UIStateModel {
    loading: boolean,
    errors: any
}

const initialState: UIStateModel = {
    loading: false,
    errors: {}
}

const uiReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: {...action.payload}
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case LOADING_UI_COMPLETE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default uiReducers;
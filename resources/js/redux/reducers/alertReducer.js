import React from "react";
import {CLOSE_ALERT, SHOW_ERROR_ALERT, SHOW_SUCCESS_ALERT} from "../typeAction";

const defaultState = {
    text: '',
    state: false,
    type: ''
}

export function alertReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_SUCCESS_ALERT:
            return {text: action.text, state: true, type: 'success'}
        case CLOSE_ALERT:
            return {...state, state: false}
        case SHOW_ERROR_ALERT:
            return {text: action.text, state: true, type: 'error'}
        default: return state;
    }
}

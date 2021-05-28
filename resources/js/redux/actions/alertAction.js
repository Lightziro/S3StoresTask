import {CLOSE_ALERT, SHOW_ERROR_ALERT, SHOW_SUCCESS_ALERT} from "../typeAction";
import store from "../store";

export const showSuccess = (text) => {
    return {
        type: SHOW_SUCCESS_ALERT,
        text: text,
    }
}
export const closeAlert = () => {
    return {
        type: CLOSE_ALERT
    }
}
export const showError = (text) => {
    return {
        type: SHOW_ERROR_ALERT,
        text: text
    }
}

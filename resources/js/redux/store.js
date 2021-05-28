import {combineReducers, createStore} from "redux";
import {cartReducer} from "./reducers/cartReducer";
import {alertReducer} from "./reducers/alertReducer";

const rootReducer = combineReducers({cartReducer, alertReducer});
const store = createStore(rootReducer);
export default store;


import React from "react";
import {render} from 'react-dom';
import Main from "./components/Main";
import {Provider} from "react-redux";
import store from "./redux/store";

require('./bootstrap');
if (document.getElementById('user')) {
    render(
        <Provider store={store}>
            <Main></Main>
        </Provider>,
        document.getElementById('user')
    );
}

import React from "react";
import ReactDom from 'react-dom';
import Main from "./components/Main";
require('./bootstrap');


if (document.getElementById('user')) {
    ReactDom.render(
        <Main></Main>,
        document.getElementById('user')
    );
}

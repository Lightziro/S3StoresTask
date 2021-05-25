import React from "react";
import {Box} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CartPage from "./ComponentsList/CartPage/CartPage";

export default function Main() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={CartPage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

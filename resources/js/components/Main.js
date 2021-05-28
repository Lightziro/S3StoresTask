import React from "react";
import {Box} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CartPage from "./ComponentsList/CartPage/CartPage";
import Navigator from "./ComponentsList/Navigator/Navigator";
import AddProductPage from "./ComponentsList/AddProductPage/AddProductPage";
import ProductPage from "./ComponentsList/ProductPage/ProductPage";
import SearchProductPage from "./ComponentsList/SearchProductPage/SearchProductPage";
import EntityTable from "./ComponentsList/EntityTable/EntityTable";

export default function Main() {
    return (
        <BrowserRouter>
            <Navigator/>
            <Switch>
                <Route path={'/'} exact component={ProductPage}/>
                <Route path={'/AddProduct'} exact component={AddProductPage}/>
                <Route path={'/UpdateProduct/:id'} exact component={AddProductPage}/>
                <Route path={'/Cart'} exact component={CartPage}/>
                <Route path={'/Search'} exact component={SearchProductPage}/>
                <Route path={'/Table'} exact component={EntityTable}/>
            </Switch>
        </BrowserRouter>
    );
}

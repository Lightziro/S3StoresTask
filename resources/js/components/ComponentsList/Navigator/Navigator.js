import React from "react";
import {Box, Container, Grid} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import './style.css'
import NavItem from "./NavItem";

export default function Navigator(props) {
    const navItem = [
        { title: 'Список товаров', link: '/'},
        { title: 'Корзина', link: '/Cart' },
        { title: 'Таблица продуктов', link: '/Table'},
        { title: 'Поиск', link: '/Search'},
        { title: 'Добавить товар', link: '/AddProduct'},
    ];

    return (
        <Container>
            <Box mb={3} mt={3}>
                <Grid container direction='row' alignItems='center' justify='center'>
                    {navItem.map((object, index) => {
                        return (<NavItem {...object} key={index}/>)
                    })}
                </Grid>
            </Box>
        </Container>
    );
}

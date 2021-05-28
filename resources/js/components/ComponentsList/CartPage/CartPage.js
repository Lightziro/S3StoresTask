import React from "react";
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";
import {connect} from "react-redux";
import './style.css'
import EmptyCart from "./EmptyCart";
import store from "../../../redux/store";

function CartPage(props) {
    let fullPrice = 0;
    props.cart.forEach(item => {
        fullPrice += item.quantity * item.price
    });

    const numberWithSpace = (number) => {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }
    return (
        <Container>
            <Grid container justify='center' alignItems='center' direction='column'>
                <Typography align='center' variant='h4'>Список товаров в корзине</Typography>
                <Typography align='center' variant='h6'>Общее количество товаров: {props.cart.length}</Typography>
                <Box mb={2} mt={4}>
                    <Grid container justify='center' alignItems='center' direction='row'>
                        {
                            props.cart.length
                                ? props.cart.map((product, i) => <ProductCard cart={true}
                                                                              id={i}
                                                                              {...product}
                                                                              type='cart'
                                                                              key={i}/>
                                )
                                : <EmptyCart/>
                        }
                    </Grid>
                </Box>
                <Paper elevation={3}>
                    <Box p={2}>
                        <Typography align='center' variant='h4'>Общая сумма
                            заказа: {numberWithSpace(fullPrice)} руб.</Typography>
                    </Box>
                </Paper>

            </Grid>
        </Container>
    )
}

const mapStateToProps = store => ({
    cart: store.cartReducer.productCart
})
export default connect(mapStateToProps)(CartPage)


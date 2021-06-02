import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Box, Container, Grid, Snackbar, Typography} from "@material-ui/core";
import store from "../../../redux/store";
import ProductCard from "../ProductCard/ProductCard";
import {getProduct} from "../../../redux/actions/cartAction";
import {Alert} from "@material-ui/lab";
import {closeAlert} from "../../../redux/actions/alertAction";

function ProductPage(props) {
    const getAllProduct = () => {
        if (!props.products.length) {
            axios.get('/api/product/all')
                .then(data => {
                    store.dispatch(getProduct(data.data))
                })
        }
    }

    useEffect(() => {
        getAllProduct();
    }, [])

    return (
        <Container>
            <Box>
                <Grid container justify='center' direction='row' alignItems='center'>
                    {
                        props.products.length
                            ? props.products.map((product, i) => {
                                return <ProductCard id={i}
                                                    {...product}
                                                    key={i}
                                                    type='watch'
                                ></ProductCard>
                            })
                            : <Typography variant='h4' align={"center"}>Список продуктов сейчас пуст</Typography>
                    }
                </Grid>
            </Box>
            <Snackbar open={props.state.state} autoHideDuration={1000} onClose={() => store.dispatch(closeAlert())}>
                <Alert onClose={() => store.dispatch(closeAlert())} severity={props.state.type}>
                    {props.state.text}
                </Alert>
            </Snackbar>
        </Container>

    );

}

const mapStateToProps = store => ({
    products: store.cartReducer.products,
    state: store.alertReducer
})
export default connect(mapStateToProps)(ProductPage)

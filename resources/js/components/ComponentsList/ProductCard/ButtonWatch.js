import React from "react";
import {Button, Grid} from "@material-ui/core";

export default function ButtonWatch(props) {
    switch (props.type) {
        case 'watch':
            return (
                <div>
                    <Grid container alignItems='center' justify='center' direction='row'>
                        <button onClick={props.eventAddCart} className='btn-add-cart'>
                            Добавить в корзину
                        </button>
                        {
                            !props.inCart
                                ? <button onClick={props.eventAddCount} className='btn-add-cart-count'>+1</button>
                                : null
                        }
                    </Grid>
                </div>
            )
        case 'cart':
            return (
                <Button onClick={props.eventDelete} size="small" color="primary">
                    Удалить из корзины
                </Button>
            )
        default:
            return '';
    }
}

import React from "react";
import {Typography} from "@material-ui/core";

export default function EmptyCart() {
    return (<div className='cart-empty-block'>
        <Typography variant='h3' align='center'>
            В корзине сейчас нет товаров
        </Typography>
        <Typography variant='h4' align="center">
            Чтобы добавить товар, нажмите на кнопку "Добавить" в разделе "Продукты"
        </Typography>
    </div>)
}

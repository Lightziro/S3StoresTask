import React from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import store from "../../../redux/store";
import './style.css';
import ButtonWatch from "./ButtonWatch";
import {addToCart, removeCart, updateCountProductCart} from "../../../redux/actions/cartAction";
import {showError} from "../../../redux/actions/alertAction";

export default function ProductCard(props) {

    const getPhoto = () => {
        return `http://s3stores.ru/storage/${props.image}`;
    }

    const buttonCartDeleteHandler = () => {
        store.dispatch(removeCart(props.product_id))
    }
    const addCartHandler = () => {

        if (props.eventCheckCart(props.product_id)) {
            store.dispatch(showError('Вы не можете добавить товар в корзину, так-как он уже есть в корзине'));
            return;
        }
        store.dispatch(addToCart(props.product_id, 1));
    }
    const updateCartHandler = () => {
        store.dispatch(updateCountProductCart(props.product_id, 1));
    }

    return (
        <div className='card-product-block'>
            <Card className='card-block'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={"Продукт " + props.name}
                        height='300px'
                        image={getPhoto()}
                        title={"Продукт " + props.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Описание: {props.description ? props.description : 'Отсутствует'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Цена: {props.price} руб.
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Количество: {props.quantity} шт.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <ButtonWatch type={props.type}
                                 eventDelete={buttonCartDeleteHandler}
                                 eventAddCount={updateCartHandler}
                                 eventAddCart={addCartHandler}
                                 inCart={props.inCart}
                    />
                </CardActions>
            </Card>
        </div>
    );
}

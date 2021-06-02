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
import {addToCart, removeCart} from "../../../redux/actions/cartAction";
import {showError} from "../../../redux/actions/alertAction";

export default function ProductCard(props) {

    const getPhoto = () => {
        return `http://s3stores.ru/storage/${props.image}`;
    }

    const buttonCartDeleteHandler = () => {
        store.dispatch(removeCart(props.product_id))
    }
    const addCartHandler = () => {
        const product = store.getState().cartReducer.products.filter(item => item.product_id === props.product_id).pop();
        if (product.quantity === 0) {
            return store.dispatch(showError('Товар отсутствует в магазине, ожидайте пополнения'));
        }
        store.dispatch(addToCart(props.product_id, 1));
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
                {
                    props.quantity >= 1 &&
                    <CardActions>
                        <ButtonWatch type={props.type}
                                     eventDelete={buttonCartDeleteHandler}
                                     eventAddCart={addCartHandler}
                                     inCart={props.inCart}
                        />
                    </CardActions>
                }
            </Card>
        </div>
    );
}

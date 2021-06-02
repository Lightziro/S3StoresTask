import {
    ADD_PRODUCT,
    ADD_PRODUCT_CART, DELETE_PRODUCT,
    DELETE_PRODUCT_CART,
    GET_PRODUCT, UPDATE_PRODUCT
} from "../typeAction";
import store from "../store";
import {showSuccess} from "./alertAction";

export const getProduct = (products) => {
    return {
        type: GET_PRODUCT,
        products
    }
}
export const addProduct = (product) => {
    store.dispatch(showSuccess('Вы успешно добавили новый товар'));
    return {
        type: ADD_PRODUCT,
        product
    }
}
export const addToCart = (id, count) => {
    store.dispatch(showSuccess('Вы успешно добавили товар в корзину'))
    return {
        type: ADD_PRODUCT_CART,
        id,
        count,
    }
}
export const removeCart = (id) => {
    store.dispatch(showSuccess('Вы успешно удалили товар из корзины'))
    return {
        type: DELETE_PRODUCT_CART,
        id,
    }
}

export const updateProduct = (product) => {
    store.dispatch(showSuccess('Вы успешно обновили данные о продукте'));
    return {
        type: UPDATE_PRODUCT,
        product,
    }
}
export const removeProduct = (id) => {
    store.dispatch(showSuccess('Товар был успешно удалён'));
    return {
        type: DELETE_PRODUCT,
        id: id
    }
}

import React from "react";
import {
    ADD_PRODUCT,
    ADD_PRODUCT_CART, DELETE_PRODUCT,
    DELETE_PRODUCT_CART,
    GET_PRODUCT,
    UPDATE_COUNT_PRODUCT_CART, UPDATE_PRODUCT
} from "../typeAction";

const defaultState = {
    productCart: [],
    products: [],
    searchProducts: [],
}

export function cartReducer(state = defaultState, action) {
    switch (action.type) {

        case ADD_PRODUCT_CART:
            const addProduct = {...state.products.find(product => product.product_id === action.id)}
            const checkInCart = state.productCart.find(product => action.id === product.product_id)
            if (checkInCart) {
                return {...state};
            }
            addProduct.quantity = action.count
            return {...state, productCart: [...state.productCart, addProduct]}

        case DELETE_PRODUCT_CART:
            return {...state, productCart: state.productCart.filter((product) => product.product_id !== action.id)}

        case UPDATE_COUNT_PRODUCT_CART:
            return {
                ...state, productCart: state.productCart.map(product => {
                    if (product.product_id === action.id) {
                        product['quantity'] += action.count;
                    }
                    return product;
                })
            }
        case GET_PRODUCT:
            return {...state, products: action.products}
        case ADD_PRODUCT:
            action.product.product_id = action.product.id;
            return {...state, products: [...state.products, action.product]}
        case DELETE_PRODUCT:
            return {...state,
                productCart: state.productCart.filter((product) => product.product_id !== action.id),
                products: state.products.filter((product) => product.product_id !== action.id)
            };
        case UPDATE_PRODUCT:
            return {
                ...state, products: state.products.map(product => {
                    if (product.product_id === action.product.product_id) {
                        product = action.product
                    }
                    return product;
                })
            }
        default: return state;
    }
}

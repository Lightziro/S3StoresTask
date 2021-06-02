import React from "react";
import {
    ADD_PRODUCT,
    ADD_PRODUCT_CART, DELETE_PRODUCT,
    DELETE_PRODUCT_CART,
    GET_PRODUCT, UPDATE_PRODUCT
} from "../typeAction";

const defaultState = {
    productCart: [],
    products: [],
}

export function cartReducer(state = defaultState, action) {
    switch (action.type) {

        case ADD_PRODUCT_CART:
            const inCart = state.productCart.find(product => action.id === product.product_id)
            if (inCart) {
                return {
                    ...state,
                    productCart: state.productCart.map(item => {
                        if (item.product_id === action.id) {
                            item.quantity++
                        }
                        return item;
                    }),
                    products: state.products.map(item => {
                        if (item.product_id === action.id) {
                            item.quantity--
                        }
                        return item;
                    })
                };
            }
            const newProduct = {...state.products.find(product => product.product_id === action.id)}
            newProduct.quantity = action.count;
            return {
                ...state,
                productCart: [...state.productCart, newProduct],
                products: state.products.map(item => {
                    if (item.product_id === action.id) {
                        item.quantity--
                    }
                    return item;
                })
            }

        case DELETE_PRODUCT_CART:
            return {...state, productCart: state.productCart.filter((product) => product.product_id !== action.id)}

        case GET_PRODUCT:
            return {...state, products: action.products}

        case ADD_PRODUCT:
            action.product.product_id = action.product.id;
            return {...state, products: [...state.products, action.product]}

        case DELETE_PRODUCT:
            return {
                ...state,
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
        default:
            return state;
    }
}

import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";


const addCartItem = (cartItems, productToAdd) => {
  const indexOfCartItem = cartItems.findIndex((cartItem) => cartItem.id === productToAdd.id);

  if (indexOfCartItem !== -1) {
    cartItems[indexOfCartItem].quantity = cartItems[indexOfCartItem].quantity + 1;
    return [ ...cartItems];
  }
 
  return [ ...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const indexOfCartItem = cartItems.findIndex((cartItem) => cartItem.id === cartItemToRemove.id);

  if (cartItems[indexOfCartItem].quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  cartItems[indexOfCartItem].quantity = cartItems[indexOfCartItem].quantity - 1;
  return [ ...cartItems]; 

}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}


export const setIsCartOpen = (bool) => 
  createAction(
    CART_ACTION_TYPES.SET_IS_CART_OPEN,
    bool
  );


export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
    );
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
    );
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
    );
}
import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

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


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  // const [ isCartOpen, setIsCartOpen ] = useState(false);
  // const [ cartItems, setCartItems ] = useState([]);
  // const [ cartCount, setCartCount ] = useState(0);
  // const [ cartTotal, setCartTotal ] = useState(0);
  const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
  
  const setCartItems = (newCartItems) => {

    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newCartTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS, 
      {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }
    ));
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    setCartItems(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    setCartItems(newCartItems);
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart, 
    cartItems, 
    cartCount,
    cartTotal
  };

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

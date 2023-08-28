import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
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

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);
  const [ cartTotal, setCartTotal ] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
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

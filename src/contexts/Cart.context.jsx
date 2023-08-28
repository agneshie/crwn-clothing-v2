import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
});

const addCartItem = (cartItems, productToAdd) => {
  const indexOfCartItem = cartItems.findIndex((cartItem) => cartItem.id === productToAdd.id);

  if (indexOfCartItem !== -1) {
    cartItems[indexOfCartItem].quantity = cartItems[indexOfCartItem].quantity + 1;
    return [ ...cartItems];
  }
 
  return [ ...cartItems, { ...productToAdd, quantity: 1}];
}

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

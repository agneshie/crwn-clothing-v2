import { useContext } from "react";

import { CartContext } from "../../contexts/Cart.context";

import { 
  CartIconContainer, 
  ShoppingIcon, 
  ItemCount 
} from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    return setIsCartOpen(!isCartOpen);
  }

  return(
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
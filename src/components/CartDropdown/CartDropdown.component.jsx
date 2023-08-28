import { useContext } from "react";

import { CartContext } from "../../contexts/Cart.context";

import Button from "../Button/Button.component";
import CartItem from "../CartItem/CartItem.component";

import "./CartDropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  
  return(
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />
          })
        }
      </div>
      
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
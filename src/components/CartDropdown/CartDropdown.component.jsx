import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/Cart.context";

import Button from "../Button/Button.component";
import CartItem from "../CartItem/CartItem.component";

import "./CartDropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
    navigate("/checkout");
  }
  
  return(
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />
          })
        }
      </div>
      
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
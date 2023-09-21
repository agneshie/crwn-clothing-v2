import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../Button/Button.component";
import CartItem from "../CartItem/CartItem.component";

import { selectCartItems } from "../../store/cart/cart.selector";

import { 
  CartDropdownContainer, 
  CartItems, 
  EmptyMessage 
} from "./CartDropdown.styles";


const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
    navigate("/checkout");
  }
  
  return(
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (
            cartItems.map((item) => {
              return <CartItem key={item.id} cartItem={item} />
            })
          ) : (
            <EmptyMessage>YOUR CART IS EMPTY</EmptyMessage>
          )
          
        }
      </CartItems>
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
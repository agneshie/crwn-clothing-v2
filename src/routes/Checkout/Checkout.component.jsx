import { useContext } from "react";

import { CartContext } from "../../contexts/Cart.context";

import CheckoutItem from "../../components/CheckoutItem/CheckoutItem.component";

import { 
  CheckoutContainer, 
  CheckoutHeader, 
  HeaderColumn, 
  Total 
} from "./Checkout.styles";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return(
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderColumn>
          <span>Product</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Description</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Quantity</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Price</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Remove</span>
        </HeaderColumn>
      </CheckoutHeader>
      {
        cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> )
      }
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
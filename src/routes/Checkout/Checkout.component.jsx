import { useSelector } from "react-redux";

import CheckoutItem from "../../components/CheckoutItem/CheckoutItem.component";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import { 
  CheckoutContainer, 
  CheckoutHeader, 
  HeaderColumn, 
  Total 
} from "./Checkout.styles";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
      <Total>Total: {cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
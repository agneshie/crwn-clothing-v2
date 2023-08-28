import { useContext } from "react";

import { CartContext } from "../../contexts/Cart.context";

import CheckoutItem from "../../components/CheckoutItem/CheckoutItem.component";

import "./Checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return(
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-column">
          <span>Product</span>
        </div>
        <div className="header-column">
          <span>Description</span>
        </div>
        <div className="header-column">
          <span>Quantity</span>
        </div>
        <div className="header-column">
          <span>Price</span>
        </div>
        <div className="header-column">
          <span>Remove</span>
        </div>
        
      </div>
      {
        cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> )
      }
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
}

export default Checkout;
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../contexts/User.context';
import { CartContext } from '../../contexts/Cart.context';

import CartIcon from '../../components/CartIcon/CartIcon.component';
import CartDropdown from '../../components/CartDropdown/CartDropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './Root.styles.scss';

const Root = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return(
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          {
            currentUser ? 
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              :
              <Link className="nav-link" to="/auth">SIGN IN</Link>
          }
          <CartIcon />
        </div>
        {
          isCartOpen && <CartDropdown />    
        }
      </div>
      <Outlet />
    </Fragment>
      
  );
}

export default Root;

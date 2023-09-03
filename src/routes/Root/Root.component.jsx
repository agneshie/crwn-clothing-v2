import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../contexts/User.context';
import { CartContext } from '../../contexts/Cart.context';

import CartIcon from '../../components/CartIcon/CartIcon.component';
import CartDropdown from '../../components/CartDropdown/CartDropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { 
  Navigation, 
  NavLinks, 
  NavLink, 
  LogoContainer 
} from './Root.styles';

const Root = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return(
    <Fragment>
      <Navigation>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {
            currentUser ? 
              <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
              :
              <NavLink to="/auth">SIGN IN</NavLink>
          }
          <CartIcon />
        </NavLinks>
        {
          isCartOpen && <CartDropdown />    
        }
      </Navigation>
      <Outlet />
    </Fragment>
  );
}

export default Root;

import { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import baseUrl from '../utils/baseUrl';

const Cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);

  const handleRemoveFromCart = async productId => {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: { productId },
      headers: { Authorization: token },
    };
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  return (
    <Segment>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary products={cartProducts} />
    </Segment>
  );
};

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) return { products: [] };
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  return { products: response.data };
};

export default Cart;

import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import baseUrl from '../utils/baseUrl';

const Cart = ({ products, user }) => {
  return (
    <Segment>
      <CartItemList products={products} user={user} />
      <CartSummary products={products} />
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

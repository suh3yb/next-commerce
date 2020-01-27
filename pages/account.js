import axios from 'axios';
import { parseCookies } from 'nookies';
import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import baseUrl from '../utils/baseUrl';

const Account = ({ user, orders }) => {
  console.log(orders);
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions />}
    </>
  );
};

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) return { orders: [] };
  const url = `${baseUrl}/api/orders`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;

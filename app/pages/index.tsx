import type { NextPage } from'next';

import { Account } from './components/Account';
import { Messages } from './components/Messages';
import { OrderForm } from './components/OrderForm';

const Home: NextPage = () => {
  return (
    <div>
      <Account />
      <OrderForm />
      <Messages />
    </div>
  );
};

export default Home;

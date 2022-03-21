import type { NextPage } from 'next';

import AuthenticationForm from '@src/components/AuthenticationForm';
import { useUser } from '@src/context/user';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <AuthenticationForm />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;

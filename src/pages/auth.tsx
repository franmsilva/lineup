import type { NextPage } from 'next';

import AuthenticationForm from '@src/components/AuthenticationForm/AuthenticationForm';
import { useAuth } from '@src/hooks/useAuth';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <AuthenticationForm />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;

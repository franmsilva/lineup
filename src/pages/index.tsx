import type { NextPage } from 'next';
import { Button } from '@mantine/core';
import { useAuth } from '@src/hooks/useAuth';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button>Hello world!</Button>
    </>
  );
};

export default Home;

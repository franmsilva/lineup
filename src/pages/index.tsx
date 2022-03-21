import type { NextPage } from 'next';
import { Button } from '@mantine/core';
import CoreLayout from '@src/components/templates/CoreLayout';
import { useUser } from '@src/context/user';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <CoreLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button>Hello world!</Button>
    </CoreLayout>
  );
};

export default Home;

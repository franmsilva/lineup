import type { NextPage } from 'next';
import { Button } from '@mantine/core';
import { useAuth } from '@src/hooks/useAuth';
import CoreLayout from '@src/components/templates/CoreLayout';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <CoreLayout>
      <pre>
        {JSON.stringify(
          {
            uid: user?.uid,
            provider: user?.providerData,
          },
          null,
          2
        )}
      </pre>
      <Button>Hello world!</Button>
    </CoreLayout>
  );
};

export default Home;

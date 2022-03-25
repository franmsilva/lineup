import type { NextPage } from 'next';
import { Button, Modal, TextInput, useMantineTheme } from '@mantine/core';
import CoreLayout from '@src/components/templates/CoreLayout';
import { useUser } from '@src/context/user';
import { useState } from 'react';
import { ChevronRight } from 'tabler-icons-react';

const Home: NextPage = () => {
  const { user } = useUser();
  const [teamName, setTeamName] = useState('');
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <CoreLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colors[theme.primaryColor][3]}
        overlayOpacity={0.75}
        size="xl"
        transition="rotate-left"
        transitionDuration={600}
        transitionTimingFunction="ease"
        title="Create Your Team"
        withCloseButton
        centered
      >
        <TextInput
          required
          id="team-name"
          label="Team Name"
          placeholder="Your team name"
          mb="xl"
          value={teamName}
          onChange={(e) => setTeamName(e.currentTarget.value)}
        />
        <Button
          rightIcon={<ChevronRight size={14} strokeWidth={2} color="white" />}
        >
          Next
        </Button>
      </Modal>
      <Button onClick={() => setOpened(true)}>Create Your Team!</Button>
    </CoreLayout>
  );
};

export default Home;

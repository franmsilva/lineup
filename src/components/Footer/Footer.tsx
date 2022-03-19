import React from 'react';
import { Container, Group, ActionIcon } from '@mantine/core';
import Logo from '../Logo';
import { TwitterIcon } from '../SocialButtons/TwitterIcon';
import { FacebookIcon } from '../SocialButtons/FacebookIcon';

import { useStyles } from './Footer.styles';

const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Logo />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <TwitterIcon />
          </ActionIcon>
          <ActionIcon size="lg">
            <FacebookIcon />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;

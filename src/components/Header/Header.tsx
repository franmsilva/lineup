import React, { useState } from 'react';
import {
  Header as MHeader,
  Group,
  ActionIcon,
  Container,
  Burger,
  Avatar,
  Divider,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';

import Logo from '@src/components/Logo';
import { TwitterIcon } from '@src/components/SocialButtons/TwitterIcon';
import { FacebookIcon } from '@src/components/SocialButtons/FacebookIcon';
import { useUser } from '@src/context/user';

import { useStyles } from './Header.styles';

interface IHeaderProps {
  links: { link: string; label: string }[];
}

const Header = ({ links }: IHeaderProps) => {
  const { classes, cx } = useStyles();
  const { user } = useUser();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <MHeader height={56} mb={120}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Logo />

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <TwitterIcon />
          </ActionIcon>
          <ActionIcon size="lg">
            <FacebookIcon />
          </ActionIcon>
          <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user?.photoUrl}
                    alt={user?.displayName || 'Account'}
                    radius="xl"
                    size={20}
                  />
                  {user?.displayName && (
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.displayName}
                    </Text>
                  )}
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item>Account details</Menu.Item>
            <Menu.Item>Logout</Menu.Item>

            <Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item color="red">Delete account</Menu.Item>
          </Menu>
        </Group>
      </Container>
    </MHeader>
  );
};

export default Header;

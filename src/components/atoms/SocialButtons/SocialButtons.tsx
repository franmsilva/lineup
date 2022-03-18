import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import { FacebookIcon } from './FacebookIcon';
import { GoogleIcon } from './GoogleIcon';
import { TwitterIcon } from './TwitterIcon';

export const FacebookButton = (props: ButtonProps<'button'>) => (
  <Button leftIcon={<FacebookIcon />} variant="default" {...props} />
);

export const GoogleButton = (props: ButtonProps<'button'>) => (
  <Button leftIcon={<GoogleIcon />} variant="default" {...props} />
);

export const TwitterButton = (props: ButtonProps<'button'>) => (
  <Button leftIcon={<TwitterIcon />} variant="default" {...props} />
);

export const SocialButtons = () => (
  <Group position="center" sx={{ padding: 15 }}>
    <FacebookButton>Continue with Facebook</FacebookButton>
    <GoogleButton>Continue with Google</GoogleButton>
    <TwitterButton>Continue with Twitter</TwitterButton>
  </Group>
);

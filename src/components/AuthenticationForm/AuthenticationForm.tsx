import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from '@mantine/core';

import AuthService from '@src/services/auth';
import { GoogleButton } from '@src/components/SocialButtons';
import { IAuthFormValues } from '@src/types/auth';

enum EAuthActions {
  Login = 'login',
  Register = 'register',
}

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' }),
});

const RegisterSchema = LoginSchema.extend({
  firstName: z
    .string()
    .min(2, { message: 'Name should have at least 2 letters' }),
  lastName: z
    .string()
    .min(2, { message: 'Name should have at least 2 letters' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' }),
  terms: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function AuthenticationForm(props: PaperProps<'div'>) {
  const [type, toggle] = useToggle(EAuthActions.Login, [
    EAuthActions.Login,
    EAuthActions.Register,
  ]);
  const form = useForm({
    schema: zodResolver(
      type === EAuthActions.Login ? LoginSchema : RegisterSchema
    ),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const handleSubmit = async (values: IAuthFormValues) => {
    try {
      type === EAuthActions.Login
        ? await AuthService.emailSignIn(values)
        : await AuthService.signUp(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Lineup, {type} with
      </Text>

      <Group grow mb="xl" mt="xl">
        <GoogleButton onClick={AuthService.googleSignIn} radius="xl">
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction="column" grow>
          {type === EAuthActions.Register && (
            <Group grow>
              <TextInput
                required
                id="first-name"
                label="First Name"
                placeholder="John"
                error={form.errors.firstName}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                required
                id="last-name"
                label="Last Name"
                placeholder="Doe"
                error={form.errors.lastName}
                {...form.getInputProps('lastName')}
              />
            </Group>
          )}

          <TextInput
            required
            id="email"
            label="Email"
            placeholder="johndoe@email.com"
            error={form.errors.email}
            {...form.getInputProps('email')}
          />

          <Group grow>
            <PasswordInput
              required
              label="Password"
              placeholder="Password"
              error={form.errors.password}
              {...form.getInputProps('password')}
            />
            {type === EAuthActions.Register && (
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Password"
                error={form.errors.confirmPassword}
                {...form.getInputProps('confirmPassword')}
              />
            )}
          </Group>

          {type === EAuthActions.Register && (
            <Checkbox
              required
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
      <Button onClick={AuthService.signOut}>Logout</Button>
    </Paper>
  );
}

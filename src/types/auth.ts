import {
  AuthError as FirebaseAuthError,
  MultiFactorError,
} from 'firebase/auth';

interface FirebaseError {
  code: string;
  message: string;
  name: string;
}

export type TAuthError = FirebaseAuthError | FirebaseError | MultiFactorError;

export interface IAuthFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

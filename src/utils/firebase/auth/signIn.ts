import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { handleFirebasePromise, isOk } from '@src/utils/promises';
import { IAuthFormValues } from '@src/types/auth';

export const emailSignIn =
  (firebaseAuth: Auth) =>
  async ({ email, password }: IAuthFormValues): Promise<User> => {
    const userCredential = await handleFirebasePromise(
      signInWithEmailAndPassword(firebaseAuth, email, password)
    );

    if (!isOk(userCredential))
      throw new Error('Oops! Failed to sign in with email and password', {
        cause: userCredential.err,
      });

    return userCredential.val.user;
  };

export const googleSignIn =
  (firebaseAuth: Auth, provider: GoogleAuthProvider) =>
  async (): Promise<User> => {
    const userCredential = await handleFirebasePromise(
      signInWithPopup(firebaseAuth, provider)
    );

    if (!isOk(userCredential))
      throw new Error('Oops! Failed to sign in with Google', {
        cause: userCredential.err,
      });

    return userCredential.val.user;
  };

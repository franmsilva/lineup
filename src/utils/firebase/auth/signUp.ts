import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  User,
} from 'firebase/auth';
import { handleFirebasePromise, isOk } from '@src/utils/promises';
import { IAuthFormValues } from '@src/types/auth';

export const signUp =
  (firebaseAuth: Auth) =>
  async ({
    firstName,
    lastName,
    email,
    password,
  }: IAuthFormValues): Promise<User> => {
    const userCredential = await handleFirebasePromise(
      createUserWithEmailAndPassword(firebaseAuth, email, password)
    );

    if (!isOk(userCredential))
      throw new Error(
        'Oops! Failed to create user with email and password...',
        {
          cause: userCredential.err,
        }
      );

    const user = userCredential.val.user;

    const profileUpdate = await handleFirebasePromise(
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      })
    );

    if (!isOk(profileUpdate))
      throw new Error('Oops! Failed to update user profile...', {
        cause: profileUpdate.err,
      });

    const emailVerification = await handleFirebasePromise(
      sendEmailVerification(user)
    );

    if (!isOk(emailVerification))
      throw new Error('Oops! Failed to send verification email...', {
        cause: emailVerification.err,
      });

    return user;
  };

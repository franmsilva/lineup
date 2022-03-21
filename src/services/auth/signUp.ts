import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { handleFirebasePromise, isOk } from '@src/utils/promises';
import { IAuthFormValues } from '@src/types/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreClientDb } from '../../firebase';
import { capitaliseFirstLetter } from '@src/utils/strings';

export const signUp =
  (firebaseAuth: Auth) =>
  async ({ firstName, lastName, email, password }: IAuthFormValues) => {
    const userCredential = await handleFirebasePromise(
      createUserWithEmailAndPassword(firebaseAuth, email, password)
    );

    if (!isOk(userCredential)) {
      throw new Error(
        'Oops! Failed to create user with email and password...',
        {
          cause: userCredential.err,
        }
      );
    }

    const user = userCredential.val.user;
    const displayName =
      capitaliseFirstLetter(firstName) + ' ' + capitaliseFirstLetter(lastName);
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    await setDoc(doc(firestoreClientDb, 'users', user.uid), {
      displayName,
      initials,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoUrl: user.phoneNumber,
    });

    const emailVerification = await handleFirebasePromise(
      sendEmailVerification(user)
    );

    if (!isOk(emailVerification)) {
      throw new Error('Oops! Failed to send verification email...', {
        cause: emailVerification.err,
      });
    }
  };

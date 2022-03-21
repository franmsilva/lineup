import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { handleFirebasePromise, isOk } from '@src/utils/promises';
import { IAuthFormValues } from '@src/types/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreClientDb } from '@src/firebase';
import { getInitials } from './helpers';

export const emailSignIn =
  (firebaseAuth: Auth) =>
  async ({ email, password }: IAuthFormValues) => {
    const userCredential = await handleFirebasePromise(
      signInWithEmailAndPassword(firebaseAuth, email, password)
    );

    if (!isOk(userCredential)) {
      throw new Error('Oops! Failed to sign in with email and password', {
        cause: userCredential.err,
      });
    }
  };

export const googleSignIn =
  (firebaseAuth: Auth, provider: GoogleAuthProvider) => async () => {
    const userCredential = await handleFirebasePromise(
      signInWithPopup(firebaseAuth, provider)
    );

    if (!isOk(userCredential)) {
      throw new Error('Oops! Failed to sign in with Google', {
        cause: userCredential.err,
      });
    }

    const user = userCredential.val.user;
    const initials = getInitials(user.displayName);

    await setDoc(doc(firestoreClientDb, 'users', user.uid), {
      displayName: user.displayName,
      initials,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoUrl: user.phoneNumber,
    });
  };

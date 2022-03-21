import { Auth, signOut as firebaseSignOut } from 'firebase/auth';

export const signOut = (firebaseAuth: Auth) => async () =>
  await firebaseSignOut(firebaseAuth);

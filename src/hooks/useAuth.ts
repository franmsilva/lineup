import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  User,
  GoogleAuthProvider,
} from 'firebase/auth';
import { signUp } from '@src/utils/firebase/auth/signUp';
import { signOut } from '@src/utils/firebase/auth/signOut';
import { emailSignIn, googleSignIn } from '@src/utils/firebase/auth/signIn';

export const useAuth = () => {
  const Auth = getAuth();
  const GoogleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(Auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) setUser(user);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = emailSignIn(Auth);
  const loginGoogleUser = googleSignIn(Auth, GoogleProvider);
  const logoutUser = signOut(Auth);
  const registerUser = signUp(Auth);

  return {
    user,
    loginUser,
    loginGoogleUser,
    logoutUser,
    registerUser,
  };
};

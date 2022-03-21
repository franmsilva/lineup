import { firebaseAuth } from '@src/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

import { signUp } from './signUp';
import { signOut } from './signOut';
import { emailSignIn, googleSignIn } from './signIn';

const AuthService = {
  signUp: signUp(firebaseAuth),
  signOut: signOut(firebaseAuth),
  emailSignIn: emailSignIn(firebaseAuth),
  googleSignIn: googleSignIn(firebaseAuth, new GoogleAuthProvider()),
};

export default AuthService;

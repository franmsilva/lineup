import { useState, useEffect, createContext, useContext, FC } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { firebaseAuth, firestoreClientDb } from '@src/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface IUser {
  uid: string;
  displayName: string;
  initials: string;
  email: string;
  phoneNumber?: string;
  photoUrl?: string;
}

interface IUserContext {
  user: IUser | null;
  error: string | null;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUser = () => useContext(UserContext);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const { uid } = user;

        const userDoc = await getDoc(doc(firestoreClientDb, `users/${uid}`));

        if (!userDoc.exists()) {
          setError(`User with id=${uid} not found!`);
        } else {
          setUser(userDoc.data() as IUser);
        }
      } else setUser(null);
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

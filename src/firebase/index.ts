import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { isEmptyArray } from '@src/utils/arrays';

import { firebaseConfig } from './config';

export const firebaseApp = isEmptyArray(getApps())
  ? initializeApp(firebaseConfig)
  : getApp();
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firestoreClientDb = getFirestore();

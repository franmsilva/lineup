import { NextApiHandler } from 'next';
import db from '@src/firebase/firestore';
import { handleFirebasePromise, isOk } from '@src/utils/promises';

const usersRef = db.collection('users');

const createUser: NextApiHandler = async (req, res) => {
  const user = req.body;

  const result = await handleFirebasePromise(usersRef.doc(user.uid).set(user));

  if (!isOk(result)) {
    res.status(500).json(result.err);
  } else {
    res.send(200);
  }
};

const getAllUsers: NextApiHandler = async (req, res) => {
  const result = await handleFirebasePromise(usersRef.get());

  if (!isOk(result)) {
    res.status(500).json(result.err);
  } else {
    res.status(200).json(
      result.val.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }))
    );
  }
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') return createUser(req, res);
  if (req.method === 'GET') return getAllUsers(req, res);
};

export default handler;

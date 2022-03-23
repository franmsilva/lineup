import { NextApiHandler } from 'next';
import db from '@src/firebase/firestore';
import { handleFirebasePromise, isOk } from '@src/utils/promises';

const usersRef = db.collection('users');

const getHandler: NextApiHandler = async (req, res) => {
  const userId = req.query.id as string;

  const result = await handleFirebasePromise(usersRef.doc(userId).get());

  if (!isOk(result)) {
    res.status(401).json(result.err);
  } else {
    res.status(200).json({
      uid: result.val.id,
      ...result.val.data(),
    });
  }
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'GET') return getHandler(req, res);
};

export default handler;

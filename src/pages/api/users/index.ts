import { NextApiHandler } from 'next';
import db from '@src/firebase/firestore';
import { handleFirebasePromise, isOk } from '@src/utils/promises';
import prisma from '@src/services/prisma';

const usersRef = db.collection('users');

const createUser: NextApiHandler = async (req, res) => {
  try {
    const user = req.body;

    await prisma.user.create({
      data: JSON.parse(user),
    });

    res.send(200);
  } catch (err) {
    res.status(500).json(err);
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

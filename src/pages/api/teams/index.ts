import { NextApiHandler } from 'next';
import db from '@src/firebase/firestore';
import { handleFirebasePromise, isOk } from '@src/utils/promises';

const teamsRef = db.collection('teams');

const createTeam: NextApiHandler = async (req, res) => {
  const [name, userId] = req.body;

  const result = await handleFirebasePromise(
    teamsRef.add({
      name,
      players: [userId],
    })
  );

  if (!isOk(result)) {
    res.status(500).json(result.err);
  } else {
    res.send(200);
  }
};

const getAllTeams: NextApiHandler = async (req, res) => {
  const result = await handleFirebasePromise(teamsRef.get());

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
  if (req.method === 'POST') return createTeam(req, res);
  if (req.method === 'GET') return getAllTeams(req, res);
};

export default handler;

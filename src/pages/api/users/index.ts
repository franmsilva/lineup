import { NextApiHandler } from 'next';
import prisma from '@src/services/prisma';

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
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      throw new Error('No users found!');
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') return createUser(req, res);
  if (req.method === 'GET') return getAllUsers(req, res);
};

export default handler;

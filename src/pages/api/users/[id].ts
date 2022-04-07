import { NextApiHandler } from 'next';
import prisma from '@src/services/prisma';

const getUserById: NextApiHandler = async (req, res) => {
  const userId = req.query.id as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      rejectOnNotFound: true,
    });

    res.status(200).json(user);
  } catch (err: any) {
    if (err.name === 'NotFoundError') {
      res.status(404).json({
        message: `User not found! ID: ${userId}`,
      });
    } else {
      res.status(500).json(err);
    }
  }
};

const updateUserById: NextApiHandler = async (req, res) => {
  const userId = req.query.id as string;

  try {
    const fieldsToUpdate = req.body;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: fieldsToUpdate,
    });

    res.send(204);
  } catch (err: any) {
    if (err.code === 'P2025') {
      res.status(404).json({
        message: `User not found! ID: ${userId}`,
      });
    } else {
      res.status(500).json(err);
    }
  }
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'GET') return getUserById(req, res);
  if (req.method === 'PATCH') return updateUserById(req, res);
};

export default handler;

import { Request, Response } from 'express';
import HttpError from 'http-errors';

import { createNewRoomService } from '../services';

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomName, walls, userId } = req.body;
    if (!userId) throw new HttpError.BadRequest();
    if (!walls) throw new HttpError.BadRequest();
    if (!roomName) throw new HttpError.BadRequest();
    await createNewRoomService(String(userId), roomName, walls).then((result) =>
      res.json(result)
    );
  } catch (err) {
    return res.json(err);
  }
};

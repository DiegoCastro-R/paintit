import { Request, Response } from 'express';
import HttpError from 'http-errors';

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { walls } = req.body;
    if (!walls) throw new HttpError.BadRequest();
  } catch (err) {
    return res.json(err);
  }
};

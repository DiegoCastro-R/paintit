import { Request, Response } from "express";
import HttpError from "http-errors";

import { SessionsService } from "../services";

export const newSession = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new HttpError.BadRequest();
    await SessionsService.createNewSessionService({ email, password }).then(
      (result) => {
        return res.json(result);
      }
    );
  } catch (err) {
    return res.json(err);
  }
};

export const refreshSession = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new HttpError.BadRequest();
    const response = await SessionsService.refreshSessionService(refreshToken);
    return res.json(response);
  } catch (err: any) {
    return res.json(err);
  }
};

export const logoutSession = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new HttpError.BadRequest();
    const response = await SessionsService.logoutSessionService(refreshToken);
    return res.json(response);
  } catch (err) {
    return res.json(err);
  }
};

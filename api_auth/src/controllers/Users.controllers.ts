import { Request, Response } from "express";
import HttpError from "http-errors";

import { UsersService } from "../services";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new HttpError.BadRequest();
    }
    await UsersService.createUserService({ name, email, password }).then(
      (result) => {
        return res.json(result);
      }
    );
  } catch (err) {
    return res.json(err);
  }
};

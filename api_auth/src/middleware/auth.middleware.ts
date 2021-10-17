import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as createError from "http-errors";
import redis from "../config/db/redis/connection";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"])
    return next(new createError.Unauthorized());
  const authHeader = req.headers["authorization"];

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  //@ts-ignore
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      //@ts-ignore
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(new createError.Unauthorized());
        //@ts-ignore
        const userId = payload.aud;
        //@ts-ignore
        redis.get(userId, (err, result) => {
          if (err) {
            console.log(err.message);
            reject(new createError.InternalServerError());
            return;
          }
          if (refreshToken === result) return resolve(userId);
          reject(new createError.Unauthorized());
        });
      }
    );
  });
};

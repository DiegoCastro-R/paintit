import * as jwt from "jsonwebtoken";
import httpErros from "http-errors";
import redis from "../config/db/redis/connection";
import { randomUUID } from "crypto";

const preventenvaccess = randomUUID();
const preventenvrefresh = randomUUID();

export const signAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "15m",
      issuer: "dev.api.kelvin",
      audience: userId,
    };
    jwt.sign(
      payload,
      secret ? secret : preventenvaccess,
      options,
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export const signRefreshToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "dev.api.kelvin",
      audience: userId,
    };
    jwt.sign(
      payload,
      secret ? secret : preventenvrefresh,
      options,
      (err, token) => {
        if (err) reject(err);
        //@ts-ignore
        redis.SET(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(new httpErros.InternalServerError());
            return;
          }
          resolve(token);
        });
      }
    );
  });
};

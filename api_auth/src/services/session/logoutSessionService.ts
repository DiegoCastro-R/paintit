import * as createError from "http-errors";
import { verifyRefreshToken } from "../../middleware/auth.middleware";
import redis from "../../config/db/redis/connection";

export const logoutSessionService = async (refreshToken: string) => {
  const userId = await verifyRefreshToken(refreshToken);
  //@ts-ignore
  redis.DEL(userId, (err, val) => {
    if (err) {
      console.log(err.message);
      throw new createError.InternalServerError();
    }

    console.log(val);
  });
  return { success: true, message: "session succesfully ended" };
};

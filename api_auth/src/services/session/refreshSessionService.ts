import { verifyRefreshToken } from "../../middleware/auth.middleware";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

export const refreshSessionService = async (refreshToken: string) => {
  const userId = await verifyRefreshToken(refreshToken);
  const aToken = await signAccessToken(String(userId));
  const rToken = await signRefreshToken(String(userId));

  return { success: true, data: { accessToken: aToken, refreshToken: rToken } };
};

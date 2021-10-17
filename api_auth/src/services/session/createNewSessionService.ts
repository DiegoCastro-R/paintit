import { UserModel } from "../../config/db/mongodb/models";
import { compare } from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

interface ICreateNewSessionSerive {
  email: string;
  password: string;
}

export const createNewSessionService = async ({
  email,
  password,
}: ICreateNewSessionSerive) => {
  const userData = await UserModel.findOne({ email });

  if (!userData) return { success: false, message: "user not found" };
  const passwordMatched = compare(password, userData.password);
  if (!passwordMatched)
    return { success: false, message: `Email/Password don't match` };
  const aToken = await signAccessToken(userData.id);
  const rToken = await signRefreshToken(userData.id);
  return {
    success: true,
    data: { accesToken: aToken, refreshToken: rToken },
  };
};

import { UserModel } from "../../config/db/mongodb/models";
import HttpErros from "http-errors";

export const getUserProfileService = async (userId: string) => {
  const userData = await UserModel.findOne({ id: userId });
  if (!userData) throw new HttpErros.InternalServerError();
  return {
    success: true,
    User: {
      name: userData.name,
      email: userData.email,
      rooms: userData.rooms,
    },
  };
};

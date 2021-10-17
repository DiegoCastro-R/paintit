import { UserModel } from "../../config/db/mongodb/models";
import httpErros from "http-errors";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

interface ICreateUserService {
  name: string;
  email: string;
  password: string;
}

export const createUserService = async ({
  name,
  email,
  password,
}: ICreateUserService) => {
  const isEmailAlreadyTaked = await UserModel.findOne({ email });
  if (isEmailAlreadyTaked)
    return {
      success: false,
      message: "email already in use",
    };
  const id = uuidv4();
  const saltRounds = 12;
  const hashedPass = await hash(password, saltRounds);

  UserModel.create(
    { id, name, email, password: hashedPass, rooms: [] },
    (err, _success) => {
      if (err) {
        console.log(err);
        throw new httpErros[500]();
      }
    }
  );
  return { success: true, message: "Users succesfully created" };
};

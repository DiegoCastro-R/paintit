import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { UserController } from "../controllers";

const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);

UserRouter.post("/profile", verifyAccessToken, UserController.getUserProfile);

export default UserRouter;

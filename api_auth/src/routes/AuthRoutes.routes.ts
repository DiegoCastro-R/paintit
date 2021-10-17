import { Router, Request, Response } from "express";

import { UserController } from "../controllers";
import SessionRouter from "./SessionRoutes.routes";

const AuthRoutes = Router();

AuthRoutes.get("/", (_req: Request, res: Response) => {
  return res.json({ success: true, message: "🟢 Auth Service is Online" });
});

AuthRoutes.post("/create-user", UserController.registerUser);

AuthRoutes.use("/session", SessionRouter);

export default AuthRoutes;

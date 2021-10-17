import { Router, Request, Response } from "express";
import SessionRouter from "./SessionRoutes.routes";
import UserRouter from "./UserRoutes.routes";

const AuthRoutes = Router();

AuthRoutes.get("/", (_req: Request, res: Response) => {
  return res.json({ success: true, message: "🟢 Auth Service is Online" });
});

AuthRoutes.use("/user", UserRouter);

AuthRoutes.use("/session", SessionRouter);

export default AuthRoutes;

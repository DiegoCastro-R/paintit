import { Router, Request, Response } from "express";

const AuthRoutes = Router();

AuthRoutes.get("/", (req: Request, res: Response) => {
  return res.json({ success: true, message: "Auth Service  is Online" });
});

export default AuthRoutes;

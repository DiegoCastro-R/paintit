import { Router, Request, Response } from "express";

const AppRouter = Router();

AppRouter.get("/", (req: Request, res: Response) => {
  return res.json({ success: true, message: "API Core Paint IT is online" });
});

export default AppRouter;

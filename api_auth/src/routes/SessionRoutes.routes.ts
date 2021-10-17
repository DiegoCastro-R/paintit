import { Router } from "express";

import { SessionController } from "../controllers";

const SessionRouter = Router();

SessionRouter.post("/new", SessionController.newSession);

SessionRouter.post("/refresh", SessionController.refreshSession);

SessionRouter.delete("/logout", SessionController.logoutSession);
/**
 * TODO
 *
 * SessionRouter.post("/profile",);
 *
 */

export default SessionRouter;

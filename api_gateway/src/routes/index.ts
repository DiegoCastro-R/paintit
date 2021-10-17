import { Router } from "express";

import AppProxyRouter from "./AppRouter.routes";

const AppRouter = Router();

AppRouter.use(AppProxyRouter);

export default AppRouter;

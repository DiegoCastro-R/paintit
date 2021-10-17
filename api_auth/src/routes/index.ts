import { Router } from "express";

import AuthRoutes from "./AuthRoutes.routes";

const AppRouter = Router();

AppRouter.use(AuthRoutes);

export default AppRouter;

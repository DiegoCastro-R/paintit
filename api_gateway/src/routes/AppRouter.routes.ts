import Router, { Request, Response, NextFunction } from "express";
import httpProxy from "express-http-proxy";
import servicesEndpoints from "./servicesURLS";
import swaggerDocument from "../swagger.json";
import swaggerUi from "swagger-ui-express";

import { verifyAccessToken } from "../middleware/auth.middleware";

const authServiceEndpoint = httpProxy(servicesEndpoints.authService);
const coreServiceEndpoint = httpProxy(servicesEndpoints.coreService);

const AppProxyRouter = Router();
AppProxyRouter.get("/", async (req: Request, res: Response) => {
  return res.json({ success: true, message: "API Gateway is Alive" });
});

AppProxyRouter.use("/auth", (req: Request, res: Response, next: NextFunction) =>
  authServiceEndpoint(req, res, next)
);

AppProxyRouter.use(
  "/core",
  verifyAccessToken,
  (req: Request, res: Response, next: NextFunction) =>
    coreServiceEndpoint(req, res, next)
);

AppProxyRouter.use("/api-docs", swaggerUi.serve);
AppProxyRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default AppProxyRouter;

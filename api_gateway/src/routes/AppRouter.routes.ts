import Router, { Request, Response, NextFunction } from "express";
import httpProxy from "express-http-proxy";
import servicesEndpoints from "./servicesURLS";
const swaggerUi = require("swagger-ui-express");
import swaggerDocument from "../swagger.json";

const authServiceEndpoint = httpProxy(servicesEndpoints.authService);

const AppProxyRouter = Router();
AppProxyRouter.get("/", async (req: Request, res: Response) => {
  return res.json({ success: true, message: "API Gateway is Alive" });
});

AppProxyRouter.use("/auth", (req: Request, res: Response, next: NextFunction) =>
  authServiceEndpoint(req, res, next)
);

AppProxyRouter.use("/api-docs", swaggerUi.serve);
AppProxyRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default AppProxyRouter;

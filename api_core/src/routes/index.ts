import { Router, Request, Response } from 'express';

const AppRouter = Router();

AppRouter.get('/', (req: Request, res: Response) =>
  res.json({ success: true, message: 'API Core Paint IT is online' })
);

AppRouter.post('/create-room');

export default AppRouter;

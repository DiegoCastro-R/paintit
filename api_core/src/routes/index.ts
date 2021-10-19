import { Router, Request, Response } from 'express';

import { RoomController } from '../controllers';

const AppRouter = Router();

AppRouter.get('/', (req: Request, res: Response) =>
  res.json({ success: true, message: 'API Core Paint IT is online' })
);

AppRouter.post('/create-room', RoomController.createRoom);

export default AppRouter;

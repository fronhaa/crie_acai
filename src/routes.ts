import { Router, Request, Response } from 'express';
import { userController } from './controller/userController';
import { paymentController } from './controller/paymentController';

const router = Router();

router.post('/login', (req: Request, res: Response) => userController.loginUser(req, res));

router.post('/payment', (req: Request, res: Response) => paymentController.register(req, res));

router.get('/payment', (req: Request, res: Response) => paymentController.getPayments(req, res));

export default router;
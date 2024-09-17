import { Router, Request, Response } from 'express';
import { userController } from './controller/userController';
import { paymentController } from './controller/paymentController';
import { measureController } from './controller/measureController';

const router = Router();

router.post('/login', (req: Request, res: Response) => userController.loginUser(req, res));


router.post('/payment', (req: Request, res: Response) => paymentController.create(req, res));

router.get('/payment', (req: Request, res: Response) => paymentController.getAll(req, res));

router.delete('/payment/:id', (req: Request, res: Response) => paymentController.delete(req, res));

router.put('/payment/:id', (req: Request, res: Response) => paymentController.update(req, res));

router.post('/measure', (req: Request, res: Response) => measureController.create(req, res));

router.get('/measure', (req: Request, res: Response) => measureController.getAll(req, res));

router.delete('/measure/:id', (req: Request, res: Response) => measureController.delete(req, res));

router.put('/measure/:id', (req: Request, res: Response) => measureController.update(req, res));

export default router;
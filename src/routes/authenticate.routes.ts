import express from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const router = express.Router();

const authenticateUserController = new AuthenticateUserController();

router.post('/sign-in', authenticateUserController.handle);

export default router;

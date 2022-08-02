import express from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const router = express.Router();

const createUserController = new CreateUserController();

router.post('/', createUserController.handle);

export default router;

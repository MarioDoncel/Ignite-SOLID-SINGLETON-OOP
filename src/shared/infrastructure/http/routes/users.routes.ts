import express from 'express';
import multer from 'multer';

import upload from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarUseController';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();
const uploadAvatar = multer(upload.upload('./tmp/avatar'));
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

router.post('/', createUserController.handle);
router.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export default router;

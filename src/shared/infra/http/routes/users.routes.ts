import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/usesCases/createUser/CreateUserController';
import { ProfileUserController } from '../../../../modules/accounts/usesCases/profileUserUseCase/ProfileUserController';
import {
    UpadateUserAvatarContorller,
} from '../../../../modules/accounts/usesCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpadateUserAvatarContorller();

const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", ensureAuthenticated, profileUserController.handle);

usersRoutes.patch("/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);


export { usersRoutes };
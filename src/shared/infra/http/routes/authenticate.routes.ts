import { Router } from 'express';

import {
    AuthenticateUserController,
} from '../../../../modules/accounts/usesCases/authenticateUser/AuathenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
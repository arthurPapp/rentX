import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories",categoriesRouters);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use(authenticateRoutes);

export { router };
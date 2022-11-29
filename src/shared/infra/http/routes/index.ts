import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';
import { rentalRouters } from './rentals.routes';

const router = Router();

router.use("/categories", categoriesRouters);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use("/cars", carsRoutes);

router.use(authenticateRoutes);

router.use("/rentals", rentalRouters);

export { router };
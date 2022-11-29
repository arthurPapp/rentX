import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRentalUseCase/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouters = Router();

const createRentalController = new CreateRentalController();

rentalRouters.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRouters };
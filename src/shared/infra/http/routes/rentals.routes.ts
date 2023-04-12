import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRentalUseCase/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalContorller";
import { ListrentalsByUserController } from "../../../../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouters = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListrentalsByUserController();

rentalRouters.post("/", ensureAuthenticated, createRentalController.handle);
rentalRouters.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRouters.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRouters };
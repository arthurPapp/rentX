import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';

import { CreateCarController } from '../../../../modules/cars/usesCases/createCar/CreateCarController';
import {
    CreateCarSpecificationController,
} from '../../../../modules/cars/usesCases/createCarSpecification/CreateCarSpecificationCotroller';
import {
    ListAvailableCarsController,
} from '../../../../modules/cars/usesCases/listAvailableCars/ListAvailabelCarsContorller';
import { UploadCarImageController } from '../../../../modules/cars/usesCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';


const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));


const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageContorller = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarsImageContorller.handle);

export { carsRoutes };
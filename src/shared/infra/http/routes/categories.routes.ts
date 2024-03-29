import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCategoryController } from '../../../../modules/cars/usesCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/usesCases/importCategory/ImporteCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/usesCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRouters = Router();
const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController()

categoriesRouters.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handler);

categoriesRouters.get("/", listCategoriesController.handle);

categoriesRouters.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRouters };
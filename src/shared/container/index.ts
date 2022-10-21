import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/repositories/implementations/UserRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategroriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepositiry';



//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository", SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UserRepository", UserRepository
);
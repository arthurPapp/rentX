import { container } from 'tsyringe';

import "./provaiders"

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategroriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepositiry';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository';
import { UserTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '../../modules/accounts/repositories/IUserTokensRepository';



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

container.registerSingleton<ICarsRepository>(
    "CarsRepository", CarsRepository
);

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository", CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository", RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository", UserTokensRepository
)
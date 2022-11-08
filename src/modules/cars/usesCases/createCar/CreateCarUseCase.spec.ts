import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })
   
    it("should be able to create a new car", async () => {
        const car = {
            name: "Car name",
            description: "Description Car",
            daily_reate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }
      const carExecute =  await createCarUseCase.execute({
            name: car.name,
            description: car.description,
            daily_reate: car.daily_reate,
            license_plate: car.license_plate,
            fine_amount: car.fine_amount,
            brand: car.brand,
            category_id: car.category_id
        });

        expect(carExecute).toHaveProperty("id");

    });

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            
            await createCarUseCase.execute({
                name: "Car1 name",
                description: "Description Car",
                daily_reate: 100,
                license_plate: "ABC1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
            await createCarUseCase.execute({
                name: "Car2 name",
                description: "Description Car",
                daily_reate: 100,
                license_plate: "ABC1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
                        

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a new car  with available tru by default", async () => {
        const car = {
            name: "Car name",
            description: "Description Car",
            daily_reate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }
       const carExeculte = await createCarUseCase.execute({
            name: car.name,
            description: car.description,
            daily_reate: car.daily_reate,
            license_plate: car.license_plate,
            fine_amount: car.fine_amount,
            brand: car.brand,
            category_id: car.category_id
        });

        expect(carExeculte.available).toBe(true);
    });
});
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro de luxo",
            daily_reate: 110.11,
            license_plate: "ACD-1233",
            fine_amount: 40,
            brand: "car_brand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi A2",
            description: "Carro de luxo",
            daily_reate: 110.11,
            license_plate: "ACD-1238",
            fine_amount: 40,
            brand: "testeBrand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "testeBrand" });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi A3",
            description: "Carro de luxo",
            daily_reate: 110.11,
            license_plate: "ACD-1235",
            fine_amount: 40,
            brand: "car_brand",
            category_id: "category_id2"
        });

        const cars = await listAvailableCarsUseCase.execute({ name: "Audi A3" });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category_id", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi A4",
            description: "Carro de luxo",
            daily_reate: 110.11,
            license_plate: "ACD-1236",
            fine_amount: 40,
            brand: "car_brand_teste",
            category_id: "category_id5"
        });

        const cars = await listAvailableCarsUseCase.execute({ category_id: "category_id5" });
        expect(cars).toEqual([car]);
    });
});
import dayjs from "dayjs";
import { AppError } from '../../../../shared/errors/AppError';
import { DayjsDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/implementation/DayjsDateProvaider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMermory } from "../../repositories/inMermory/RentalsRepositoryInMermory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMermory: RentalsRepositoryInMermory;
let carsRepositoryInMomory: CarsRepositoryInMemory;
let dayjsDateProvaider: DayjsDateProvaider;

describe("Create Rental", () => {
  const dayAddHours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMermory = new RentalsRepositoryInMermory();
    carsRepositoryInMomory = new CarsRepositoryInMemory();
    dayjsDateProvaider = new DayjsDateProvaider();
    createRentalUseCase = new CreateRentalUseCase(dayjsDateProvaider, rentalsRepositoryInMermory, carsRepositoryInMomory);
  });

  it(" should be able to create a new rental", async () => {
    const car = await carsRepositoryInMomory.create({
      name: "test",
      description: "terer",
      daily_reate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAddHours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date")
  });

  it(" should be not able to create a new rental if another open to the save user", async () => {
    const car = await carsRepositoryInMomory.create({
      name: "test",
      description: "terer",
      daily_reate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAddHours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: dayAddHours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));

  });
})

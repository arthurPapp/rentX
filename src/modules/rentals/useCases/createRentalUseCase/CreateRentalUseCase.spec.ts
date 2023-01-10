import dayjs from "dayjs";
import { DayjsDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/implementation/DayjsDateProvaider";
import { AppError } from "../../../../shared/errors/AppError";
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
    dayjsDateProvaider = new DayjsDateProvaider();
    createRentalUseCase = new CreateRentalUseCase(dayjsDateProvaider, rentalsRepositoryInMermory, carsRepositoryInMomory);
  });

  it(" should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayAddHours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date")
  });

  it(" should be not able to create a new rental if another open to the save user", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "Xuyu",
        expected_return_date: dayAddHours,
      });
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: dayAddHours,
      });
    }).rejects.toBeInstanceOf(AppError);

  });
  it(" should be not able to create a new rental if another open to the save car", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "XXX",
        car_id: "12345",
        expected_return_date: dayAddHours,
      });
      await createRentalUseCase.execute({
        user_id: "Waa",
        car_id: "12345",
        expected_return_date: dayAddHours,
      });
    }).rejects.toBeInstanceOf(AppError);


  });
  it(" should be not able to create a new rental with invalid time", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "XXX",
        car_id: "12345",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})

import { inject, injectable } from "tsyringe";
import { IDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/IDateProvaider";

import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("DayjsDateProvaider")
    private dateProvaider: IDateProvaider,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) { }
  async execute(
    {
      user_id,
      car_id,
      expected_return_date
    }: IRequest): Promise<Rental> {

    const compareHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }
    const compare = this.dateProvaider.compareInHours(this.dateProvaider.dateNow(), expected_return_date);

    if (compare < compareHours) {
      throw new AppError("Invalid return time!");
    }
    const rental = await this.rentalsRepository.create(
      {
        user_id,
        car_id,
        expected_return_date,
      }
    );

    return rental;

  };
}

export { CreateRentalUseCase };
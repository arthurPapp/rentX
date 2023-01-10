import { inject, injectable } from "tsyringe";
import { IDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/IDateProvaider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {


  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvaider")
    private dateProvaider: IDateProvaider,
  ) { }

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;
    let total = 0;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!")
    }
    const car = await this.carsRepository.findById(rental.car_id);

    //Verificar tempo de aluguel 
    const dateNow = this.dateProvaider.dateNow();

    //compara os dias para verificar se foi entrega antes de 24horas
    const dailyProvaider = this.dateProvaider.compareInDays(rental.start_date, dateNow);

    let daily = dailyProvaider <= 0 ? minimum_daily : dailyProvaider;

    const delay = this.dateProvaider.compareInDays(dateNow, rental.expected_return_date);

    const calculate_fine = delay > 0 ? delay * car.fine_amount : car.fine_amount;


    total += daily * calculate_fine;

    rental.end_date = this.dateProvaider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase }
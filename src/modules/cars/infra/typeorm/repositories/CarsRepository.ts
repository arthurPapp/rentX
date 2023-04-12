import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async findById(id: string): Promise<Car> {
        return this.repository.findOne(id);
    }
    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand })
        }
        if (name) {
            carsQuery.andWhere("name = :name", { name })
        }
        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id })
        }
        const cars = await carsQuery.getMany();

        return cars;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })
        return car;
    }

    async create({
        name,
        description,
        daily_reate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_reate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        })

        await this.repository.save(car);
        return car;
    }

}

export { CarsRepository };

import { inject, injectable } from "tsyringe";
import { deleteFiles } from "../../../../utils/file";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {

  constructor(
    @inject("CarsImageRepository")
    private carsImagesRepository: ICarsImageRepository
  ) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      const car_image = await this.carsImagesRepository.create(car_id, image);
      if (car_image.car_id) {
        await deleteFiles(`./tmp/cars/${car_image.image_name}`);
      }
    });


  }
}

export { UploadCarImageUseCase };
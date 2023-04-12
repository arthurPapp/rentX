import { inject, injectable } from "tsyringe";
import { IStorageProvaider } from "../../../../shared/container/provaiders/StorageProvaider/IStoreageProvaider";
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
    private carsImagesRepository: ICarsImageRepository,
    @inject("StorageProvaider")
    private storageProvaider: IStorageProvaider
  ) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      const car_image = await this.carsImagesRepository.create(car_id, image);


      if (car_image.car_id) {
        await this.storageProvaider.delete(car_image.image_name, "cars");
      }

      await this.storageProvaider.save(car_image.image_name, "cars");
    });


  }
}

export { UploadCarImageUseCase };
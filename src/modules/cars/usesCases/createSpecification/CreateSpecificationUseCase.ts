import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepositiry';

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository) {
        
    }
   async execute({ name, description }: IRequest): Promise<void>{
       const specificationAlredExit = await this.specificationRepository.findByName(name);
        if (specificationAlredExit) {
            throw new AppError("Specification alredy exists!");
        }
        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
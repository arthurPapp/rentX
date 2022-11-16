import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO, ISpecificationRepository } from '../../../repositories/ISpecificationRepositiry';
import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = getRepository(Specification);
    }
   
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOne({ name });       
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
         return await this.repository.findByIds(ids);  
    }
    
}
export { SpecificationRepository}
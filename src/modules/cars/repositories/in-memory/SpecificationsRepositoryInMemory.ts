import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepositiry';

class SpecificationsRepositoryInMemory implements ISpecificationRepository{

    spefications:Specification[] = [];
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description
        });
        this.spefications.push(specification);
        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.spefications.find((specification) => specification.name === name);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.spefications.filter((specification) => ids.includes(specification.id));
    }

}

export { SpecificationsRepositoryInMemory };
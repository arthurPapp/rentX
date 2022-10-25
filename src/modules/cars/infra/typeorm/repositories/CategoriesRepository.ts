import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategroriesRepository';
import { Category } from '../entities/Category';

//singleton

class CategoriesRepository implements ICategoriesRepository {    
    
    private repository: Repository<Category>;
   
    constructor() {
        this.repository = getRepository(Category);
    }
    async create({ name, description} :ICreateCategoryDTO): Promise<void> {
        //inicia como a classe Category assim ele chama o construtor
        const category = this.repository.create({
            description,
            name
        })

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        return await this.repository.find(); 
    }

    async findByName(name: string): Promise<Category>{
        return await this.repository.findOne({name});
    }
}

export {CategoriesRepository}
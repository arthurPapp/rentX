import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

class UserRepository implements IUsersRepository{
   
    private repository: Repository<User>
    constructor() {
        this.repository = getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
    
    async create({name, username, password, email, driver_lincense, id, avatar}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            password,
            email,
            driver_lincense,
            id,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByUserName(username: string): Promise<User> {
        const user = await this.repository.findOne({ username });
        return user;
    }
}

export { UserRepository}
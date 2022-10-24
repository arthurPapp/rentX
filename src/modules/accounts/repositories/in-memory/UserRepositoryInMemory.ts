import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository{

    users: User[] = [];

    async create({name, username, password, email, driver_lincense}: ICreateUserDTO): Promise<void> {
        const user = new User();
            
            Object.assign(user, {
                name,
                username,
                password,
                email,
                driver_lincense
            });
        this.users.push(user);
    }
    async findByUserName(username: string): Promise<User> {
        return this.users.find((user) => user.username === username);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
    
}

export { UserRepositoryInMemory };
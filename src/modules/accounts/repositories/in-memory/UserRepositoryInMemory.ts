import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository {


    users: User[] = [];

    async create({ name, username, password, email, driver_lincense }: ICreateUserDTO): Promise<void> {
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
    async findByUserNameAndEmail(username: string, email: string): Promise<User> {
        return this.users.find((user) => user.username === username && user.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }
    async findByUserName(username: string): Promise<User> {
        return this.users.find(us => us.username === username);
    }
    async updatePassword(id: string, password: string): Promise<void> {
        const user = this.users.findIndex(us => us.id === id);
        this.users[user].password = password;
    }

}

export { UserRepositoryInMemory };
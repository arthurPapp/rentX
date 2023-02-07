import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {

    create(data: ICreateUserDTO): Promise<void>;
    findByUserNameAndEmail(username: string, email: string): Promise<User>;
    findById(id: string): Promise<User>;
    findByUserName(username: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updatePassword(id: string, password: string): Promise<void>;
}

export { IUsersRepository }
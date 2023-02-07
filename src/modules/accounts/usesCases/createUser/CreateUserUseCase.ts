import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUsersRepository
    ) {

    }
    async execute({ name, username, password, email, driver_lincense }: ICreateUserDTO): Promise<void> {

        const userAlreadyExist = await this.usersRepository.findByUserNameAndEmail(username, email);
        if (userAlreadyExist) {
            throw new AppError("User already exist");
        }

        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name,
            username,
            password: passwordHash,
            email,
            driver_lincense
        });
    }
}

export { CreateUserUseCase };
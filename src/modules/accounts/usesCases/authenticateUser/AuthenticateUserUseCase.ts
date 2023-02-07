import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import auth from '../../../../config/auth';
import { IDateProvaider } from '../../../../shared/container/provaiders/DateProvaider/IDateProvaider';

import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

interface IRequest {
    username: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        username: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepostory: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvaider")
        private dayjsDateProvaider: IDateProvaider
    ) { }
    async execute({ username, password }: IRequest): Promise<IResponse> {
        //verificar se o user existe
        const user = await this.userRepostory.findByUserName(username);
        const {
            secret_token,
            secret_refresh_token,
            expires_in_token,
            expires_in_refresh_token,
            expires_refresh_token_days
        } = auth

        if (!user) {
            throw new AppError("Username or password incorret");
        }

        //se a senha esta correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Username or password incorret");
        }

        //gerar jwt

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ username }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dayjsDateProvaider.addDays(expires_refresh_token_days);
        await this.userTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: user.id
        })

        const response: IResponse = {
            user: {
                name: user.name,
                username: user.username
            },
            token,
            refresh_token
        }

        return response;
    }
}


export { AuthenticateUserUseCase };
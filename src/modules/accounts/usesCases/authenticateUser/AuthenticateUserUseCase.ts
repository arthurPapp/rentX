import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest{
    username: string;
    password: string;
}
interface IResponse{
    user: {
        name: string;
        username: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepostory : IUsersRepository
    ) {}
   async execute({username, password}: IRequest):Promise<IResponse> {
        //verificar se o user existe
       const user = await this.userRepostory.findByUserName(username);
       if (!user) {
           throw new AppError("Username or password incorret");
       }
       //se a senha esta correta
       const passwordMatch = await compare(password, user.password);
       if (!passwordMatch) {
           throw new AppError("Username or password incorret");
       }
        
        //gerar jwt
       
       const token = sign({}, "15b1c269e2207484d60e5f460eb76119", {
           subject: user.id,
           expiresIn: "1d"
       });

       const response: IResponse = {
           user: {
               name: user.name,
               username: user.username
           },
           token
       }

       return response;
    }
}


export { AuthenticateUserUseCase };
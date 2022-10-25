import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request:Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    const [, token] = authHeader.split(" ");
    console.log(token);
    try {
        const {sub: user_id} = verify(token, "15b1c269e2207484d60e5f460eb76119") as IPayload;
        console.log(user_id);

        const userRepository = new UserRepository();

        const user = userRepository.findById(user_id);
        if (!user) {
            throw new AppError("Token missing", 401);
        }


        request.user = {
            id: user_id
        };

        next();
    } catch {
         throw new AppError("Token missing", 401);
    }
    

}
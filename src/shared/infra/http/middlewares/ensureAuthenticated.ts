import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;
    // const userTokensRepository = new UserTokensRepository();
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        // const userRepository = new UserRepository();

        //const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        // if (!user) {
        //     throw new AppError("Token missing", 401);
        // }


        request.user = {
            id: user_id
        };

        next();
    } catch {
        throw new AppError("Token missing", 401);
    }


}
import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToknes";
interface IUserTokensRepository {

  create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokensDTO): Promise<UserTokens>;

  findByUserId(user_id: string): Promise<UserTokens[]>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>
}

export { IUserTokensRepository }
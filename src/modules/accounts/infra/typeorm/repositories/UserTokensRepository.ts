
import { getRepository, Repository } from "typeorm";
import { ICreateUserTokensDTO } from "../../../dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../entities/UserToknes";

class UserTokensRepository implements IUserTokensRepository {

  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    return await this.repository.find({ user_id });
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: any): Promise<UserTokens> {
    return await this.repository.findOne({
      user_id,
      refresh_token
    });
  }

  async deleById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token })
  }


}

export { UserTokensRepository }
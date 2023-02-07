import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";


import { IDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/IDateProvaider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvaider")
    private dayjsDateProvaider: IDateProvaider,
    @inject("UserRepository")
    private userRepository: IUsersRepository,
  ) { }

  async execute({ token, password }: IRequest) {

    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token Invalid!");
    }


    if (this.dayjsDateProvaider.compareIfBefore(userToken.expires_date, this.dayjsDateProvaider.dateNow())) {
      throw new AppError("Token Expired!");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.updatePassword(userToken.user_id, passwordHash);

    await this.userTokensRepository.deleById(userToken.id);
  }
}

export { ResetPasswordUseCase }
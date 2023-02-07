import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import auth from "../../../../config/auth"
import { IDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/IDateProvaider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository"

interface IPayload {
  sub: string;
  username: string;
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvaider")
    private dayjsDateProvaider: IDateProvaider,
  ) { }
  async execute(token: string): Promise<string> {

    const { secret_refresh_token, expires_refresh_token_days, expires_in_refresh_token } = auth
    const { username, sub } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh Token does not existis!")
    }

    await this.userTokensRepository.deleById(userToken.id);
    const expires_date = this.dayjsDateProvaider.addDays(expires_refresh_token_days);

    const refresh_token = sign({ username }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    });

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}
export { RefreshTokenUseCase }
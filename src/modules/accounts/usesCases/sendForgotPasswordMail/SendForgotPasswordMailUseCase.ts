import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";
import auth from "../../../../config/auth";
import { IDateProvaider } from "../../../../shared/container/provaiders/DateProvaider/IDateProvaider";
import { IMailProvaider } from "../../../../shared/container/provaiders/MailProvaider/IMailProvaider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvaider")
    private dateProvaider: IDateProvaider,
    @inject("MailProvaider")
    private mailProvaider: IMailProvaider,
  ) { }

  async excute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(__dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user)
      throw new AppError("User does not exists!");

    const token = uuidV4();

    const expires_date = this.dateProvaider.addMinutes(auth.expires_recovery_pass);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`
    }

    await this.mailProvaider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath);
  }
}

export { SendForgotPasswordMailUseCase }
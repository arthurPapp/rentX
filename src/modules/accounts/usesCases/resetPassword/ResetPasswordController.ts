import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";



class ResetPasswordController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetPassowrdUseCase = container.resolve(ResetPasswordUseCase);
    await resetPassowrdUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordController }
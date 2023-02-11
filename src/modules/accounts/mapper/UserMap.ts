import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    username,
    driver_lincense,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      username,
      driver_lincense,
      avatar_url
    })
    return user;
  }
}

export { UserMap }
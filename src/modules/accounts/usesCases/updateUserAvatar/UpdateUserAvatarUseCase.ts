import { inject, injectable } from 'tsyringe';
import { IStorageProvaider } from '../../../../shared/container/provaiders/StorageProvaider/IStoreageProvaider';

import { deleteFiles } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';


interface IRequest {
    user_id: string;
    avatar: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository,
        @inject("StorageProvaider")
        private storageProvaider: IStorageProvaider
    ) { }

    async execute({ user_id, avatar }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);


        if (user.avatar) {
            await this.storageProvaider.delete(user.avatar, "avatar");

        }

        await this.storageProvaider.save(avatar, "avatar");
        user.avatar = avatar;

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };



      //Adicionar coluna avatar na tabaela de users X
        // Refatorar entidade usuario com coluna avatar X
        //configuracao upload no mutter
        //criar regra de negocio do upload
        // criar controller
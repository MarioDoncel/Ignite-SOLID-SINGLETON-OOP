import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUserRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}
@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ avatarFile, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found');
    }
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

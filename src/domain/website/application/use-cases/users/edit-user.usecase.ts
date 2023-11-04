import bcryptjs from 'bcryptjs';

import {
  Either,
  NotAllowedError,
  ResourceNotFoundError,
  left,
  right,
} from '@/core/errors';
import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UsersRepository } from '@/domain/website/application/repositories';

export type EditUserUseCaseRequest = {
  loggedUserId: string;
  loggedUserRole: UserEntityRole;
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    user_name?: string;
    email?: string;
    password?: string;
    role?: UserEntityRole;
  };
};

export type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { user: UserEntity }
>;

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    loggedUserId,
    loggedUserRole,
    data,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (
      (loggedUserId !== data.id.toString() ||
        data.role ||
        data.email ||
        data.user_name) &&
      loggedUserRole !== 'ADMIN'
    ) {
      return left(new NotAllowedError());
    }

    const password_hash = data.password
      ? await bcryptjs.hash(data.password, 5)
      : undefined;

    user.first_name = data.first_name ?? user.first_name;
    user.last_name = data.last_name ?? user.last_name;
    user.email = data.email ?? user.email;
    user.user_name = data.user_name ?? user.user_name;
    user.password = password_hash ?? user.password;
    user.role = data.role ?? user.role;

    await this.usersRepository.save(user);

    return right({
      user,
    });
  }
}

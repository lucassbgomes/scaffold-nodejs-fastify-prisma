import bcryptjs from 'bcryptjs';

import { Either, UserAlreadyExistsError, left, right } from '@/core/errors';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';
import { UsersRepository } from '@/domain/website/application/repositories';

export type CreateUserUseCaseRequest = {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  role?: UserEntityRole;
};

export type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  { user: Omit<UserEntity, 'password'> }
>;

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    dataUser: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { email, user_name } = dataUser;

    const userWithSameEmail = await this.usersRepository.findByUnique({
      email,
      user_name,
    });

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError());
    }

    const { first_name, last_name, password, role } = dataUser;
    const password_hash = await bcryptjs.hash(password, 5);

    const user = UserEntity.create({
      first_name,
      last_name,
      email,
      user_name,
      password: password_hash,
      role,
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}

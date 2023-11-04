import bcryptjs from 'bcryptjs';

import { Either, InvalidCredentialsError, left, right } from '@/core/errors';
import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';

export type CreateSessionUserUseCaseRequest = {
  user_name: string;
  password: string;
};

export type CreateSessionUserUseCaseResponse = Either<
  InvalidCredentialsError,
  { user: UserEntity }
>;

export class CreateSessionUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_name,
    password,
  }: CreateSessionUserUseCaseRequest): Promise<CreateSessionUserUseCaseResponse> {
    const user = await this.usersRepository.findByUnique({
      email: user_name,
      user_name: user_name,
    });

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const doesPasswordMatches = await bcryptjs.compare(password, user.password);

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError());
    }

    return right({
      user,
    });
  }
}

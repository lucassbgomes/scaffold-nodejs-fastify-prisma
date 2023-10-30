import { InvalidCredentialsError } from '@/errors/users/invalid-credentials.error';
import { UsersRepository } from '@/repositories/users/users.repository';
import {
  UserAuthenticateRequest,
  UserAuthenticateResponse,
} from '@/types/users';
import bcryptjs from 'bcryptjs';

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_name,
    password,
  }: UserAuthenticateRequest): Promise<UserAuthenticateResponse> {
    const user = await this.usersRepository.findByUnique({
      email: user_name,
      user_name: user_name,
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await bcryptjs.compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    const { password: _, ...userResponse } = user;

    return {
      user: userResponse,
    };
  }
}

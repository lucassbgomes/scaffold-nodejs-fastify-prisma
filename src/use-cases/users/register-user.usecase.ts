import bcryptjs from 'bcryptjs';

import { UserCreateData, UserDataResponse } from '@/types/users';
import { UsersRepository } from '@/repositories/users/users.repository';
import { UserAlreadyExistsError } from '@/errors/users/user-already-exists.error';

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    first_name,
    last_name,
    user_name,
    email,
    password,
    role,
  }: UserCreateData): Promise<UserDataResponse> {
    const userWithSameEmail = await this.usersRepository.findByUnique({
      email,
      user_name,
    });

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await bcryptjs.hash(password, 5);

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      user_name,
      email,
      password: password_hash,
      role,
    });

    return {
      user,
    };
  }
}

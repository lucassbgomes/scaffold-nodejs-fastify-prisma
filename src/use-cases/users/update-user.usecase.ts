import bcryptjs from 'bcryptjs';

import { UserDataResponse, UserUpdateData } from '@/types/users';
import { UsersRepository } from '@/repositories/users/users.repository';

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    userId: string,
    { first_name, last_name, user_name, email, password, role }: UserUpdateData,
  ): Promise<UserDataResponse> {
    const password_hash = password
      ? await bcryptjs.hash(password, 5)
      : undefined;

    const user = await this.usersRepository.update(userId, {
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

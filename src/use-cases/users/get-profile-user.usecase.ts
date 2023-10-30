import { ResourceNotFoundError } from '@/errors/users/resource-not-found.error';
import { UsersRepository } from '@/repositories/users/users.repository';
import { UserParamsData, UserResponse } from '@/types/users';

export class GetProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: UserParamsData): Promise<UserResponse> {
    const userFound = await this.usersRepository.findById(id);

    if (!userFound) {
      throw new ResourceNotFoundError();
    }

    const { password: _, ...user } = userFound;

    return {
      user,
    };
  }
}

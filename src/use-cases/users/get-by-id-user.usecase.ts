import { UsersRepository } from '@/repositories/users/users.repository';
import { UserParamsData, UserResponse } from '@/types/users';

export class GetByIdUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: UserParamsData): Promise<UserResponse> {
    const userFound = await this.usersRepository.findById(id);

    if (!userFound) {
      return null;
    }

    const { password: _, ...userResponse } = userFound;

    return {
      user: {
        ...userResponse,
      },
    };
  }
}

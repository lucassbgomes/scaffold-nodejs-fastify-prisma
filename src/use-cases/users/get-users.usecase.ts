import { UsersRepository } from '@/repositories/users/users.repository';
import { UsersResponse } from '@/types/users';

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<UsersResponse> {
    const usersFound = await this.usersRepository.findMany();

    const users = usersFound.map((user) => {
      const { password: _, ...userResponse } = user;

      return {
        ...userResponse,
      };
    });

    return {
      users,
    };
  }
}

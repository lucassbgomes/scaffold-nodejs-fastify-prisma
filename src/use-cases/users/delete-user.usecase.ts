import { UsersRepository } from '@/repositories/users/users.repository';
import { UserParamsData } from '@/types/users';

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: UserParamsData) {
    await this.usersRepository.delete(id);
  }
}

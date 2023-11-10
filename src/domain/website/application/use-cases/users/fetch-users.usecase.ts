import { Either, right } from '@/core/errors';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UsersRepository } from '@/domain/website/application/repositories';

export type FetchUsersUseCaseRequest = {
  size?: number;
  page: number;
};

export type FetchUsersUseCaseResponse = Either<null, { users: UserEntity[] }>;

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    size,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ page, size });

    return right({
      users,
    });
  }
}

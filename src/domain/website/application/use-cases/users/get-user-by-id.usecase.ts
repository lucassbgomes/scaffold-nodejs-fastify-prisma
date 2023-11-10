import { Either, ResourceNotFoundError, left, right } from '@/core/errors';
import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';

export type GetUserByIdUseCaseRequest = {
  userId: string;
};

export type GetUserByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: UserEntity }
>;

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({
      user,
    });
  }
}

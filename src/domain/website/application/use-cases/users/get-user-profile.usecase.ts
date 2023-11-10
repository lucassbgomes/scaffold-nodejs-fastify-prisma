import { Either, ResourceNotFoundError, left, right } from '@/core/errors';
import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';

export type GetUserProfileUseCaseRequest = {
  userId: string;
};

export type GetUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: UserEntity }
>;

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({
      user,
    });
  }
}

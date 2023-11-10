import {
  Either,
  NotAllowedError,
  ResourceNotFoundError,
  left,
  right,
} from '@/core/errors';
import { UsersRepository } from '@/domain/website/application/repositories';

export type DeleteUserUseCaseRequest = {
  userId: string;
};

export type DeleteUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<never, never>
>;

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (user.role !== 'ADMIN') {
      return left(new NotAllowedError());
    }

    await this.usersRepository.delete(user);

    return right({});
  }
}

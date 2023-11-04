import { Either, ResourceNotFoundError, left, right } from '@/core/errors';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntityResponseData } from '@/domain/website/enterprise/entities/user/user.types';

export type GetUserByIdUseCaseRequest = {
  userId: string;
};

export type GetUserByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: UserEntityResponseData }
>;

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const userFound = await this.usersRepository.findById(userId);

    if (!userFound) {
      return left(new ResourceNotFoundError());
    }

    const user = {
      id: userFound.id.toString(),
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      email: userFound.email,
      user_name: userFound.user_name,
      created_at: userFound.created_at,
      updated_at: userFound.updated_at,
      deleted_at: userFound.deleted_at,
      role: userFound.role,
    };

    return right({
      user,
    });
  }
}

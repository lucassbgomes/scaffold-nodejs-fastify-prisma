import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/users/prisma/prisma-users.repository';
import { GetUserByIdUseCase } from '../get-user-by-id.usecase';

export function makeGetUserByIdUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaUsersRepository);

  return getUserByIdUseCase;
}

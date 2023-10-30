import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { GetUsersUseCase } from '../get-users.usecase';

export function makeGetUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUsersUseCase = new GetUsersUseCase(prismaUsersRepository);

  return getUsersUseCase;
}

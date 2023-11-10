import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/users/prisma/prisma-users.repository';
import { FetchUsersUseCase } from '../fetch-users.usecase';

export function makeFetchUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const fetchUsersUseCase = new FetchUsersUseCase(prismaUsersRepository);

  return fetchUsersUseCase;
}

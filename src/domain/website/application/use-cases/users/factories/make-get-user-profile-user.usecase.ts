import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/users/prisma/prisma-users.repository';
import { GetUserProfileUseCase } from '../get-user-profile.usecase';

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserProfileCase = new GetUserProfileUseCase(prismaUsersRepository);

  return getUserProfileCase;
}

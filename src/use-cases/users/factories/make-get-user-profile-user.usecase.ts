import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { GetProfileUserUseCase } from '../get-profile-user.usecase';

export function makeGetProfileUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getProfileUserCase = new GetProfileUserUseCase(prismaUsersRepository);

  return getProfileUserCase;
}

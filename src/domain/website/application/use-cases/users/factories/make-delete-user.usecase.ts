import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/users/prisma/prisma-users.repository';
import { DeleteUserUseCase } from '../delete-user.usecase';

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

  return deleteUserUseCase;
}

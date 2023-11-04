import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prisma-users.repository';
import { EditUserUseCase } from '../edit-user.usecase';

export function makeEditUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const editUserCase = new EditUserUseCase(prismaUsersRepository);

  return editUserCase;
}

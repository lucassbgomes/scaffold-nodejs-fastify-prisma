import { prisma } from '@/lib/prisma';
import {
  UserCreateData,
  UserData,
  UserUniqueData,
  UserUpdateData,
} from '@/types/users';
import { UsersRepository } from '../users.repository';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData): Promise<UserData> {
    const user = await prisma.user.create({ data });

    return user;
  }

  async update(userId: string, data: UserUpdateData): Promise<UserData> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return user;
  }

  async findByUnique({
    email,
    user_name,
  }: UserUniqueData): Promise<UserData | null> {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { user_name }] },
    });

    return user;
  }

  async findById(id: string): Promise<UserData | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findMany(): Promise<UserData[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

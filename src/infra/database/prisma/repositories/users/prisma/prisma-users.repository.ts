import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UserEntityUniqueData } from '@/domain/website/enterprise/entities/user/user.types';

import { prisma } from '@/infra/database/prisma/lib/prisma';
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/users/prisma-user.mapper';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByUnique({
    email,
    user_name,
  }: UserEntityUniqueData): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { user_name }] },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findMany(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();

    return users.map(PrismaUserMapper.toDomain);
  }

  async create(user: UserEntity) {
    const data = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({ data });
  }

  async save(user: UserEntity) {
    const data = PrismaUserMapper.toPrisma(user);

    await prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    });
  }

  async delete({ id }: UserEntity) {
    await prisma.user.delete({
      where: {
        id: id.toString(),
      },
    });
  }
}

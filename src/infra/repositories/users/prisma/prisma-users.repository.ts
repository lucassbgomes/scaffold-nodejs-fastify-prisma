import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UserEntityUniqueData } from '@/domain/website/enterprise/entities/user/user.types';

import { prisma } from '@/infra/database/prisma/lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const userFound = await prisma.user.findUnique({ where: { id } });

    if (!userFound) {
      return null;
    }

    const user = UserEntity.create(
      {
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        password: userFound.password,
        user_name: userFound.user_name,
        email: userFound.email,
        role: userFound.role,
        created_at: userFound.created_at,
        updated_at: userFound.updated_at,
        deleted_at: userFound.deleted_at ? userFound.deleted_at : undefined,
      },
      new UniqueEntityID(userFound.id),
    );

    return user;
  }

  async findByUnique({
    email,
    user_name,
  }: UserEntityUniqueData): Promise<UserEntity | null> {
    const userFound = await prisma.user.findFirst({
      where: { OR: [{ email }, { user_name }] },
    });

    if (!userFound) {
      return null;
    }

    const user = UserEntity.create(
      {
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        password: userFound.password,
        user_name: userFound.user_name,
        email: userFound.email,
        role: userFound.role, // TODO implement userFound.role
        created_at: userFound.created_at,
        updated_at: userFound.updated_at,
        deleted_at: userFound.deleted_at ? userFound.deleted_at : undefined,
      },
      new UniqueEntityID(userFound.id),
    );

    return user;
  }

  async findMany(): Promise<UserEntity[]> {
    const usersFound = await prisma.user.findMany();

    const users = usersFound.map((user) => {
      return UserEntity.create(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          user_name: user.user_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at,
          deleted_at: user.deleted_at ? user.deleted_at : undefined,
        },
        new UniqueEntityID(user.id),
      );
    });

    return users;
  }

  async create({
    first_name,
    last_name,
    email,
    user_name,
    password,
    role,
    created_at,
    updated_at,
  }: UserEntity) {
    await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        user_name,
        password,
        role,
        created_at,
        updated_at,
      },
    });
  }

  async save({
    id,
    first_name,
    last_name,
    email,
    user_name,
    password,
    role,
    updated_at,
    deleted_at,
  }: UserEntity) {
    await prisma.user.update({
      where: {
        id: id.toString(),
      },
      data: {
        first_name,
        last_name,
        email,
        user_name,
        password,
        role,
        updated_at,
        deleted_at,
      },
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

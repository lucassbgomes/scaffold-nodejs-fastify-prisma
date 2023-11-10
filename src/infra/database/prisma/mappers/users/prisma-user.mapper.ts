import { User, Prisma } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserEntity } from '@/domain/website/enterprise/entities';

export class PrismaUserMapper {
  static toDomain(raw: User): UserEntity {
    return UserEntity.create(
      {
        first_name: raw.first_name,
        last_name: raw.last_name,
        password: raw.password,
        user_name: raw.user_name,
        email: raw.email,
        role: raw.role,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        deleted_at: raw.deleted_at,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      first_name: raw.first_name,
      last_name: raw.last_name,
      password: raw.password,
      user_name: raw.user_name,
      email: raw.email,
      role: raw.role,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      deleted_at: raw.deleted_at,
    };
  }
}

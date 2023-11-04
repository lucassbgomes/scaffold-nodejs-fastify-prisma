import { PaginationParams } from '@/core/types/pagination-params';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UserEntityUniqueData } from '@/domain/website/enterprise/entities/user/user.types';

export default interface UsersRepository {
  findById(id: string): Promise<UserEntity | null>;

  findByUnique(userUnique: UserEntityUniqueData): Promise<UserEntity | null>;

  findMany(params: PaginationParams): Promise<UserEntity[]>;

  create(data: UserEntity): Promise<void>;

  save(data: UserEntity): Promise<void>;

  delete(data: UserEntity): Promise<void>;
}
